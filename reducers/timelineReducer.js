export default function reducer(
  state = {
    itemfiles: [],
    items: [
      {
        id: "img_back",
        content: "",
        start: new Date(1970, 0, 1, 0, 0, 0, 0, 0),
        end: new Date(1970, 0, 1, 0, 0, 40, 0),
        type: "background",
        className: "vis-time-back",
        group: 1,
      },
      {
        id: "bgm_back",
        content: "",
        start: new Date(1970, 0, 1, 0, 0, 0, 0, 0),
        end: new Date(1970, 0, 1, 0, 0, 40, 0),
        type: "background",
        className: "vis-time-back",
        group: 2,
      },
    ],
    resurl: "",
    adding: false,
    added: false,
    imgAdded: false,
    edited: false,
    secEdit: false,
    deleted: false,
  },
  action
) {
  switch (action.type) {
    case "FETCH_ALL":
      return { ...state, fething: true };
    case "ADD_ITEM":
      return {
        ...state,
        itemfiles: [
          ...state.itemfiles,
          {
            id: action.payload.id,
            filetype: action.payload.filetype,
            start: action.payload.start,
            end: action.payload.end,
            volume: 100,
            url: action.payload.url,
            index: action.payload.index,
          },
        ],
        items: [
          ...state.items,
          {
            id: action.payload.id,
            content: action.payload.content,
            start: action.payload.start,
            end: action.payload.end,
            editable: action.payload.editable,
            group: action.payload.group,
          },
        ],
        adding: false,
        added: true,
        edited: false,
        secEdit: false,
        deleted: false,
      };
    case "ADD_IMGS":
      return {
        ...state,
        itemfiles: [...state.itemfiles, action.posts],
        items: [...state.items, action.lineitem],
        imgAdded: true,
        deleted: false,
        edited: false,
        secEdit: false,
      };
    case "DELETE_IMGS":
      return {
        ...state,
        itemfiles: state.itemfiles.filter(
          (itemfile) => itemfile.filetype !== "img"
        ),
        items: state.items.filter((item) => item.group !== 1),
        edited: false,
        secEdit: false,
        deleted: true,
      };
    case "DELETE_ITEM":
      return {
        ...state,
        itemfiles: state.itemfiles.filter(
          (itemfile) => itemfile.id !== action.payload
        ),
        items: state.items.filter((item) => item.id !== action.payload),
        imgAdded: false,
        edited: false,
        secEdit: false,
        deleted: true,
      };
    case "UPDATE_STARTTIME":
      return {
        ...state,
        itemfiles: state.itemfiles.map((e) =>
          e.id === action.payload.id
            ? {
                id: action.payload.id,
                filetype: action.payload.filetype,
                start: action.payload.start,
                end: action.payload.end,
                volume: action.payload.volume,
                url: action.payload.url,
                index: action.payload.index,
              }
            : e
        ),
        items: state.items.map((e) =>
          e.id === action.payload.id
            ? {
                id: action.payload.id,
                content: action.payload.content,
                start: action.payload.start,
                end: action.payload.end,
                editable: action.payload.editable,
                group: action.payload.group,
              }
            : e
        ),
        added: false,
        imgAdded: false,
        edited: false,
        secEdit: false,
        deleted: false,
      };
    case "EDIT_END":
      return { ...state, edited: true };
    case "SEC_EDIT":
      return {
        ...state,
        itemfiles: state.itemfiles.map((e) =>
          e.id === action.payload.id
            ? {
                id: action.payload.id,
                filetype: action.payload.filetype,
                start: action.payload.start,
                end: action.payload.end,
                volume: action.payload.volume,
                url: action.payload.url,
                index: action.payload.index,
              }
            : e
        ),
        items: state.items.map((e) =>
          e.id === action.payload.id
            ? {
                id: action.payload.id,
                content: action.payload.content,
                start: action.payload.start,
                end: action.payload.end,
                editable: action.payload.editable,
                group: action.payload.group,
              }
            : e
        ),
        added: false,
        imgAdded: false,
        edited: false,
        secEdit: false,
        deleted: false,
      };
    case "SEC_EDITED":
      return { ...state, secEdit: true };

    default:
      break;
  }

  return state;
}
