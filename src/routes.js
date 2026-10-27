// Screens that can be reopened by name (used to restore the navigation after an iOS interruption).
import { storeScreen, productScreen } from './screens/store.js';
import { libraryScreen } from './screens/library.js';
import { hubScreen } from './screens/hub.js';
import { searchScreen } from './screens/search.js';
import { settingsScreen } from './screens/settings.js';
import { profileScreen } from './screens/profile.js';
import { gamebaseScreen } from './screens/gamebase.js';

export const ROUTES = { store: storeScreen, product: productScreen, library: libraryScreen, hub: hubScreen, search: searchScreen, settings: settingsScreen, profile: profileScreen, gamebase: gamebaseScreen };
for (const [name, f] of Object.entries(ROUTES)) f.route = name;
import { galleryScreen } from './screens/create.js';
ROUTES.gallery = galleryScreen; galleryScreen.route = 'gallery';
import { chatScreen } from './screens/messages.js';
ROUTES.chat = chatScreen; chatScreen.route = 'chat';
