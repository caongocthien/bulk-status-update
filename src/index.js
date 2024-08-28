import './css/styles.css';
import {initializeApp} from './handler';
import Store from './store/store';

// Init store
const states = new Store();

// Event listener
kintone.events.on('app.record.index.show', (event) =>
  initializeApp(event, states),
);
