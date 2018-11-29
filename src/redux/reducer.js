import path, {
  initialFooterCalculationsState,
  initialContentCalculationsState,
  initialSettingState,
  initialContentState,
  initialState,
} from './path';
import createReducer from '../util/Reducer';
import { actions } from './action';
import { ImmutableObjectBuilder } from '../util/ImmutabilityHelper';
import { makeSequence, updateObject } from '../util/Util';
import { ContentFormat } from '../constants/ContentConstants';

const load = (state, { state: newState }) => new ImmutableObjectBuilder(newState)
  .set(path.isLoaded(), true)
  .build();

const unload = () => new ImmutableObjectBuilder(initialState)
  .set(path.isLoaded(), false)
  .build();

const setContentMetadata = (state, { contentFormat, bindingType, contentCount }) => new ImmutableObjectBuilder(state)
  .set(path.isInitContents(), true)
  .set(path.contentFormat(), contentFormat)
  .set(path.bindingType(), bindingType)
  .set(path.contents(), makeSequence(contentCount, 1).map(initialContentState))
  .set(path.contentsCalculations(), contentFormat === ContentFormat.HTML
    ? makeSequence(contentCount, 1).map(initialContentCalculationsState)
    : [initialContentCalculationsState(1)])
  .build();

const setContents = (state, {
  type,
  contentFormat,
  bindingType,
  contents,
}) => new ImmutableObjectBuilder(state)
  .set(path.isInitContents(), true)
  .set(path.contentFormat(), contentFormat)
  .set(path.bindingType(), bindingType)
  .set(path.contents(), contents.map((content, i) => updateObject(initialContentState(i + 1), content)))
  .set(path.isContentsLoaded(), type === actions.SET_CONTENTS_BY_VALUE)
  .set(path.contentsCalculations(), contentFormat === ContentFormat.HTML
    ? contents.map((_, i) => initialContentCalculationsState(i + 1))
    : [initialContentCalculationsState(1)])
  .build();

const updateCurrent = (state, { current }) => new ImmutableObjectBuilder(state)
  .set(path.current(), updateObject(state.current, current))
  .build();

const updateSetting = (state, { setting }) => new ImmutableObjectBuilder(state)
  .set(path.setting(), updateObject(state.setting, setting))
  .build();

const updateContent = (state, action) => new ImmutableObjectBuilder(state)
  .set(path.content(action.index), action.content)
  .set(path.isContentLoaded(action.index), true)
  .set(path.isContentOnError(action.index), false)
  .set(path.contentError(action.index), null)
  .set(path.isContentsLoaded(), action.isAllLoaded)
  .build();

const updateContentError = (state, action) => new ImmutableObjectBuilder(state)
  .set(path.content(action.index), null)
  .set(path.isContentLoaded(action.index), false)
  .set(path.isContentOnError(action.index), true)
  .set(path.contentError(action.index), action.error)
  .set(path.isContentsLoaded(), action.isAllLoaded)
  .build();

const updateContentCalculation = (state, { calculation }) => new ImmutableObjectBuilder(state)
  .set(
    path.contentsCalculation(calculation.index),
    updateObject(state.calculations.contents[calculation.index - 1], { ...state.calculations.contents[calculation.index - 1], ...calculation }),
  )
  .build();

const updateFooterCalculation = (state, { calculation }) => new ImmutableObjectBuilder(state)
  .set(
    path.footerCalculations(),
    updateObject(state.calculations.footer, { ...state.calculations.footer, ...calculation }),
  )
  .build();

const invalidateCalculations = state => new ImmutableObjectBuilder(state)
  .set(path.isAllCalculated(), false)
  .set(path.isReadyToRead(), false)
  .set(path.contentsCalculations(), state.calculations.contents.map(s => initialContentCalculationsState(s.index)))
  .set(path.footerCalculations(), initialFooterCalculationsState())
  .set(path.calculationsTargets(), [])
  .build();

const updateCalculationsTotal = (state, action) => new ImmutableObjectBuilder(state)
  .set(path.isAllCalculated(), action.isCompleted)
  .set(path.calculationsTotal(), action.calculationsTotal)
  .build();

const setReadyToRead = (state, { isReadyToRead }) => new ImmutableObjectBuilder(state)
  .set(path.isReadyToRead(), isReadyToRead)
  .build();

const updateSelection = (state, { selection }) => new ImmutableObjectBuilder(state)
  .set(path.selection(), selection)
  .build();

const setCalculationsTargets = (state, { targets }) => new ImmutableObjectBuilder(state)
  .set(path.calculationsTargets(), targets)
  .build();

export default ({
  setting: customSetting = {},
} = {}) => {
  const setting = { ...initialSettingState(), ...customSetting };
  return createReducer({ ...initialState, setting }, {
    [actions.LOAD]: load,
    [actions.UNLOAD]: unload,
    [actions.SET_CONTENT_METADATA]: setContentMetadata,
    [actions.SET_CONTENTS_BY_VALUE]: setContents,
    [actions.SET_CONTENTS_BY_URI]: setContents,
    [actions.SET_READY_TO_READ]: setReadyToRead,
    [actions.UPDATE_SETTING]: updateSetting,
    [actions.UPDATE_CONTENT]: updateContent,
    [actions.UPDATE_CONTENT_ERROR]: updateContentError,
    [actions.UPDATE_CURRENT]: updateCurrent,
    [actions.INVALIDATE_CALCULATIONS]: invalidateCalculations,
    [actions.UPDATE_CONTENT_CALCULATIONS]: updateContentCalculation,
    [actions.UPDATE_FOOTER_CALCULATIONS]: updateFooterCalculation,
    [actions.UPDATE_CALCULATIONS_TOTAL]: updateCalculationsTotal,
    [actions.UPDATE_SELECTION]: updateSelection,
    [actions.SET_CALCULATIONS_TARGETS]: setCalculationsTargets,
  });
};
