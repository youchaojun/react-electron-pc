import { ChangeModuleActions, MentTabActions } from '../actionCreators/public';
import { CHANHE_MODULE_INDEX, MENU_TAB_LIST } from '../actionTypes/public';
import { publicState, PublicStateIF } from '../states/public';

type PublicReducerActions = MentTabActions | ChangeModuleActions;

const publicReducer = (
  state: PublicStateIF = publicState,
  action: PublicReducerActions
): PublicStateIF => {
  switch (action.type) {
    case MENU_TAB_LIST:
      return {
        ...state,
        menuTab: action.mentTab,
      };
    case CHANHE_MODULE_INDEX:
      return {
        ...state,
        currentTabIndex: action.currentTabIndex,
      };
    default:
      return state;
  }
};

export { publicReducer };
