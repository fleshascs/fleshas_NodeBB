async function axiosHandler(axiosPromise) {
  try {
    return await axiosPromise;
  } catch (e) {
    if (e.response && e.response.data) {
      e.message = e.response.data;
    }
    throw e;
  }
}

export default axiosHandler;
