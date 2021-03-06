import _ from 'lodash';
import AppConstants from '../constants/constants';
import {register} from '../dispatcher/dispatcher';
import {EventEmitter} from 'events';

const CHANGE_EVENT = 'change';

var _influencers = [];
var _influencerList = [];

const AppStore = Object.assign(EventEmitter.prototype, {
    emitChange() {
        this.emit(CHANGE_EVENT);
    },
    addChangeListener(callback) {
        this.on(CHANGE_EVENT, callback);
    },
    removeChangeListener(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    },
    getAllInfluencers() {
        return _influencers;
    },
    getSelectedInfluencers() {
        return _influencerList;
    },
    getInfluencerById(id) {
        return _.find(_influencers, {id:id});
    },
    dispatcherIndex: register(function(action) {
        switch(action.actionType) {
            case AppConstants.INITIALIZE:
                _influencers = action.initialData.influencers;
                _influencerList = action.initialData.influencerList;
                break;
            case AppConstants.ADD_INFLUENCER_TO_LIST:
                _influencerList.push(action.influencer);
                break;
        }
        AppStore.emitChange();
    })
});

export default AppStore;
