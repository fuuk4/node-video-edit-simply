export default function reducer(
  state = {
    prefiles: [],
    files: [],
    uploding: false,
    uploaded: false,
    error: null,
  },
  action
) {
  switch (action.type) {
    case "ADD_PRE_FILE":
      return {
        ...state,
        prefiles: [...state.prefiles, action.payload],
        uploading: true,
      };
    case "ADD_FILE":
      return {
        ...state,
        files: [
          ...state.files,
          state.prefiles.find((prefile) => prefile.id === action.payload),
        ],
        uploaing: false,
        uploaded: true,
      };
    case "ADD_URL":
      return {
        ...state,
        prefiles: state.prefiles.map((e) =>
          e.id === action.payload.id
            ? {
                id: e.id,
                name: e.name,
                index: e.index,
                filetype: e.filetype,
                prevurl: action.payload.url,
              }
            : e
        ),
      };
    case "EDIT_INDEX":
      return {
        ...state,
        prefiles: state.prefiles.map((e) =>
          e.id === action.file.id ? action.file : e
        ),
        files: state.files.map((e) =>
          e.id === action.file.id ? action.file : e
        ),
      };
    case "DELETE_FILE":
      return {
        ...state,
        prefiles: state.prefiles.filter((file) => file.id !== action.payload),
        files: state.files.filter((file) => file.id !== action.payload),
      };
    default:
      break;
  }

  return state;
}
