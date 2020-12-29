const axios = require('axios');
const async = require('async');
const user = require('../../src/user');

const fleshasLegacyLogin = module.exports;
fleshasLegacyLogin.authLegacyFleshas = async function (username, password) {
  const response = await axios.post('https://legacy.fleshas.lt/api_login.php?api_login=true', {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: {
      user_name: username,
      user_pass: password,
      login: 'Jungtis'
    }
  });
  if (response.data && response.data.success) {
    return response.data.user_id;
  }
  return null;
};

fleshasLegacyLogin.updatePassword = function (uid, password) {
  user.hashPassword(password, function (err, hash) {
    if (err) {
      return;
    }
    async.parallel(
      [
        async.apply(user.setUserField, uid, 'password', hash),
        async.apply(user.reset.updateExpiry, uid)
      ],
      () => {
        //do nothing
      }
    );
  });
};

fleshasLegacyLogin.findUser = async function (username) {
  return new Promise((resolve, reject) => {
    user.search(
      {
        query: username,
        searchBy: 'username',
        page: 1,
        sortBy: 'joindate',
        onlineOnly: false,
        bannedOnly: false,
        flaggedOnly: false
      },
      (err, data) => {
        if (data && data.users) {
          const u = data.users.find((_user) => _user.username.length === username.length);
          resolve(u);
        }
        resolve(null);
      }
    );
  });
};

fleshasLegacyLogin.checkAndUpdate = async function (req, err) {
  if (err.message !== '[[error:invalid-login-credentials]]') {
    return null;
  }

  let userData = null;
  const legacyUserId = await fleshasLegacyLogin.authLegacyFleshas(
    req.body.username,
    req.body.password
  );

  if (legacyUserId) {
    const result = await fleshasLegacyLogin.findUser(req.body.username);
    userData = {
      passwordExpiry: 0,
      uid: result && result.uid,
      isAdminOrGlobalMod: false
    };
    if (userData.uid) {
      fleshasLegacyLogin.updatePassword(userData.uid, req.body.password);
    }
  }

  return userData;
};
