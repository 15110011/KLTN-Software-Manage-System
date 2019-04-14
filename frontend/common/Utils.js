import * as draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { EditorState, convertToRaw, ContentState } from 'draft-js'


const CLIENT_ID = '198687486620-j6arq60a9h0bd50jc41lg6g05c4r93n0.apps.googleusercontent.com';
const API_KEY = 'AIzaSyD9UWuarN59ZP3HiDbYEhwZuNVeYwfZg0E';
const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest"];
const SCOPES = 'https://www.googleapis.com/auth/gmail.readonly';


const flatObject = (root, target) => {
  Object.keys(root).forEach(key => {
    if (Array.isArray(root[key])) {
      target = { ...target, [key]: root[key][0] }
    }
    else if (typeof root[key] == 'object') {
      target = { ...target, ...flatObject(root[key], target) }
    }
    else {
      target = { ...target, [key]: root[key] }
    }
  })
  return target
}

const htmlToState = (html) => {
  const contentBlock = htmlToDraft(html);
  if (contentBlock) {
    const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
    const editorState = EditorState.createWithContent(contentState);
    return editorState
  }
}

const draftToRaw = (draft) => {
  return draftToHtml(convertToRaw(draft.getCurrentContent()))
}

export { htmlToState, draftToRaw, flatObject }