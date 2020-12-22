export function fetchAll() {
  return {
    type: "FETCH_ALL",
  };
}

export function addItem(id, content, start, time, group, url, filetype) {
  const payload = {
    id: id,
    content: content,
    start: start,
    end: time,
    group: group,
    url: url,
    filetype: filetype,
  };
  switch (filetype) {
    case "bgm":
      payload.editable = {
        remove: true,
      };
      payload.index = 5;
      payload.volume = 30;
      break;
    case "se":
      payload.editable = {
        updateTime: true,
        remove: true,
      };
      payload.index = 6;
      payload.volume = 100;
      break;
  }
  return {
    type: "ADD_ITEM",
    payload: payload,
  };
}

export function addImgs(itemfiles, items) {
  return {
    type: "ADD_IMGS",
    posts: itemfiles,
    lineitem: items,
  };
}

export function deleteImgs() {
  return {
    type: "DELETE_IMGS",
  };
}

export function deleteItem(id) {
  return {
    type: "DELETE_ITEM",
    payload: id,
  };
}

export function updateStart(
  id,
  content,
  start,
  time,
  volume,
  group,
  url,
  filetype,
  editable,
  index
) {
  return {
    type: "UPDATE_STARTTIME",
    payload: {
      id: id,
      content: content,
      start: start,
      end: time,
      volume: volume,
      group: group,
      url: url,
      filetype: filetype,
      editable: editable,
      index: index,
    },
  };
}

export function updated() {
  return {
    type: "EDIT_END",
  };
}

export function secUpdateStart(
  id,
  content,
  start,
  time,
  volume,
  group,
  url,
  filetype,
  editable,
  index
) {
  return {
    type: "SEC_EDIT",
    payload: {
      id: id,
      content: content,
      start: start,
      end: time,
      volume: volume,
      group: group,
      url: url,
      filetype: filetype,
      editable: editable,
      index: index,
    },
  };
}

export function secUpdated() {
  return {
    type: "SEC_EDITED",
  };
}

export function uploadinfo(uidb, csrf) {
  return {
    type: "UPLOAD_INFO",
    payload: {
      uidb: uidb,
      csrf: csrf,
    },
  };
}
