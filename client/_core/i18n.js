const NextI18Next = require('next-i18next').default;

const nodeBBTranslationKey = /\[\[.*?\]\]/g; // [[key, arg, arg]]

const NextI18 = new NextI18Next({
  defaultLanguage: 'en',
  otherLanguages: ['lt'],
  localePath: 'client/static/locales'
});

function translate(key, args) {
  return NextI18.i18n.translator.translate(key, args);
}

function translateNodeBBTemplate(template, translateKey = translate) {
  let result;
  while ((result = nodeBBTranslationKey.exec(template)) !== null) {
    const { textId, args } = parseTransaltionArgs(result[0]);
    if (textId) {
      const translation = translateKey(textId, args);
      template = template.replace(result, translation);
    }
  }
  return template;
}

function parseNodeBBArgsIfExist(text) {
  const match = nodeBBTranslationKey.exec(text);
  if (match) {
    return parseTransaltionArgs(text);
  }
  return {};
}

function parseTransaltionArgs(text) {
  const match = text.replace(/(^.*\[|\].*$)/g, '').split(',');
  const [rawTextId, ...rawArgs] = match;
  const textId = rawTextId.replace(/(:|\.|\/)/g, '-'); // next-i18next can't translate if key has ":", "/" or "." 
  const args = adaptNodebbTranlationArgs(rawArgs); // nodebb returns array, but nextjs needs an object
  return { textId, args };
}

function adaptNodebbTranlationArgs(args) {
  if (!args) return;
  return args.reduce((newArgs, arg, index) => {
    newArgs['arg' + index] = arg;
    return newArgs;
  }, {});
}

NextI18.translate = translate;
NextI18.parseNodeBBArgsIfExist = parseNodeBBArgsIfExist;
NextI18.translateNodeBBTemplate = translateNodeBBTemplate;
module.exports = NextI18;
