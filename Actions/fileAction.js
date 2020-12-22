export function addPreFile(prefile) {
  return {
    type: "ADD_PRE_FILE",
    payload: prefile,
  };
}
export function addFile(id) {
  return {
    type: "ADD_FILE",
    payload: id,
  };
}

export function addurl(id, url) {
  return {
    type: "ADD_URL",
    payload: {
      id: id,
      url: url,
    },
  };
}

export function editIndex(file) {
  return {
    type: "EDIT_INDEX",
    file: file,
  };
}

export function deleteFile(id) {
  return { type: "DELETE_FILE", payload: id };
}
