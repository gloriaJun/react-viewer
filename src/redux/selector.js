import { createSelector } from 'reselect';
import path from './path';
import { nullSafeGet } from '../util/Util';
import { BindingType, ContentFormat } from '../constants/ContentConstants';

const getReader = state => state.reader || {};

export const selectReaderContents = createSelector(
  [getReader],
  reader => nullSafeGet(reader, path.contents(), []),
);

export const selectReaderContentFormat = createSelector(
  [getReader],
  reader => nullSafeGet(reader, path.contentFormat(), ContentFormat.HTML),
);

export const selectReaderBindingType = createSelector(
  [getReader],
  reader => nullSafeGet(reader, path.bindingType(), BindingType.LEFT),
);

export const selectReaderSetting = createSelector(
  [getReader],
  reader => nullSafeGet(reader, path.setting(), {}),
);

export const selectReaderCurrent = createSelector(
  [getReader],
  reader => nullSafeGet(reader, path.current(), {}),
);

export const selectReaderCurrentContentIndex = createSelector(
  [getReader],
  reader => nullSafeGet(reader, path.currentContentIndex(), 1),
);

export const selectReaderCurrentOffset = createSelector(
  [getReader],
  reader => nullSafeGet(reader, path.currentOffset(), 0),
);

export const selectReaderContentsCalculations = createSelector(
  [getReader],
  reader => nullSafeGet(reader, path.contentsCalculations(), []),
);

export const selectReaderIsAllCalculated = createSelector(
  [getReader],
  reader => nullSafeGet(reader, path.isAllCalculated(), false),
);

export const selectReaderCalculationsTotal = createSelector(
  [getReader],
  reader => nullSafeGet(reader, path.calculationsTotal(), 0),
);

export const selectReaderFooterCalculations = createSelector(
  [getReader],
  reader => nullSafeGet(reader, path.footerCalculations(), {}),
);

export const selectReaderIsInitContents = createSelector(
  [getReader],
  reader => nullSafeGet(reader, path.isInitContents(), false),
);

export const selectReaderIsReadyToRead = createSelector(
  [getReader],
  reader => nullSafeGet(reader, path.isReadyToRead(), false),
);

export const selectReaderIsLoaded = createSelector(
  [getReader],
  reader => nullSafeGet(reader, path.isLoaded(), true),
);

export const selectReaderSelection = createSelector(
  [getReader],
  reader => nullSafeGet(reader, path.selection(), null),
);

export const selectReaderAnnotationCalculations = createSelector(
  [getReader],
  reader => nullSafeGet(reader, path.annotationCalculations(), null),
);

export const selectReader = getReader;
