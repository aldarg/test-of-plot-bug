const curveData1 = {
  label: 'Моя кривая',
  kind: 2,
  color: '#ff0000ff', // rgba
  minValue: 0,
  maxValue: 800,
  autoMinMax: true,
  values: [Number.NaN, 180, Number.NaN, 360, Number.NaN, 720, Number.NaN, Number.NaN],
  times: [1623298225000, 1623298525000, 1623298825000, 1623299125000, 1623299425000, 1623299725000, 1623300025000, 1623300325000],
  textFormat: {
    visible: true,
    lineVisible: true,
    fractionDigits: 2,
    bgcolor: '#56b1bdff'
  },
};

const curveData2 = {
  label: 'Моя заливка',
  fillType: 0, // 0 - слева, 1 - справа, 2 - между, 3 - по базовой линии
  negativeMethod: 0, // 0 - цвет, 1 - текстура, 2 - палитра
  negativeColor: "#0000ff80",
};

export { curveData1, curveData2 };
