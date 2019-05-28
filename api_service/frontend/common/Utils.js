import * as draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { EditorState, convertToRaw, ContentState } from 'draft-js'
import { WS_NOFICATION_URL, WS_MAIL_URL } from './urls'


const CLIENT_ID = '198687486620-j6arq60a9h0bd50jc41lg6g05c4r93n0.apps.googleusercontent.com';
const API_KEY = 'AIzaSyD9UWuarN59ZP3HiDbYEhwZuNVeYwfZg0E';
const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest"];
const SCOPES = 'https://mail.google.com/';


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

console.log(htmlToState)

const draftToRaw = (draft) => {
  return draftToHtml(convertToRaw(draft.getCurrentContent()))
}

const initWebsocket = userId => {
  return new WebSocket(WS_NOFICATION_URL + '/' + userId)
}

const initMailWebsocket = userId => new WebSocket(WS_MAIL_URL + '/' + userId)

export { htmlToState, draftToRaw, flatObject, CLIENT_ID, API_KEY, DISCOVERY_DOCS, SCOPES, initWebsocket, initMailWebsocket }
