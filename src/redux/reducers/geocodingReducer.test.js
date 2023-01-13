import fetchingStatuses from '../fetchingStatuses';
import geocodingReducer from '../slices/geocodingSlice';
import fetchGeocoding from '../thunks/fetchGeocoding/fetchGeocoding';

const initialState = {
  data: {},
  loadingStatus: null,
  error: null,
};

describe('geocodingReducer tests', () => {
  it('passing an unknow action should return initial state', () => {
    const action = { type: undefined };
    const expectedState = initialState;
    const result = geocodingReducer(undefined, action);

    expect(result).toEqual(expectedState);
  });

  it('passing an action with the fetchGeocoding.pending status', () => {
    const action = { type: fetchGeocoding.pending.type };
    const expectedState = {
      ...initialState,
      loadingStatus: fetchingStatuses.loading,
    };

    const result = geocodingReducer(initialState, action);

    expect(result).toEqual(expectedState);
  });

  it('passing an action with the fetchGeocoding.fulfilled status', () => {
    const expectedData = { city: 'london' };
    const action = {
      type: fetchGeocoding.fulfilled.type,
      payload: expectedData,
    };
    const expectedState = {
      ...initialState,
      data: expectedData,
      loadingStatus: fetchingStatuses.resolved,
    };

    const result = geocodingReducer(initialState, action);

    expect(result).toEqual(expectedState);
  });

  it('passing an action with the fetchGeocoding.rejected status', () => {
    const expectedError = 'mock error text';
    const action = {
      type: fetchGeocoding.rejected.type,
      payload: expectedError,
    };
    const expectedState = {
      ...initialState,
      loadingStatus: fetchingStatuses.error,
      error: expectedError,
    };

    const result = geocodingReducer(initialState, action);

    expect(result).toEqual(expectedState);
  });
});
