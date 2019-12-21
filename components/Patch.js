async function onPopStatePatch(e) {
  if (!e.state) {
    return
  }
  let state = e.state
  // Check for nested state created by the `history` package
  if (state.state) {
    state = state.state
  }
  let as = state.as || '/';
  let url = state.url || '/';
  // console.log("url:" + url);
  // console.log("as:" + as);
  this.replace(url, as, { shallow: true });
}

export default onPopStatePatch
