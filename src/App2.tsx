import React, { useEffect, useReducer } from 'react';

type Curve = {
  id: string;
  message: string;
  needLoading: boolean;
  hasNewData: boolean;
};

const request = 'https://baconipsum.com/api/?type=meat-and-filler';
const changeCurve = (id: string, prop: {}) => (item: Curve) =>
  id === item.id ? { ...item, ...prop } : item;

const reducer = (
  state: Curve[],
  action: { type: string; payload: { id: string; prop: {} } },
) => {
  switch (action.type) {
    case 'INIT':
      return state.map(changeCurve(action.payload.id, action.payload.prop));
    case 'SUCCESS':
      return state.map(changeCurve(action.payload.id, action.payload.prop));
    default:
      return state;
  }
};

const App2: React.FC = () => {
  const curve1: Curve = {
    id: '1',
    message: '',
    needLoading: true,
    hasNewData: false,
  };
  const curve2: Curve = {
    id: '2',
    message: '',
    needLoading: true,
    hasNewData: false,
  };
  const initialState: Curve[] = [curve1, curve2];
  const [state, dispatch] = useReducer(reducer, initialState);
  // const [state, setState] = useState<Curve[]>(initialState);

  const load = (curve: Curve) => {
    dispatch({
      type: 'INIT',
      payload: {
        id: curve.id,
        prop: { needLoading: false, hasNewData: false },
      },
    });
    fetch(request)
      .then((r) => r.json())
      .then((data) => {
        dispatch({
          type: 'SUCCESS',
          payload: {
            id: curve.id,
            prop: { needLoading: true, hasNewData: true, message: data },
          },
        });
      });
  };

  useEffect(() => {
    state.forEach((curve) => {
      const { id, message, hasNewData, needLoading } = curve;
      if (hasNewData) {
        console.log(`${id}: ${message}`);
      }

      if (needLoading) {
        load(curve);
      }
    });
  }, [state]);

  return <div>Hello, world!</div>;
};

export default App2;
