/* eslint-disable prefer-arrow-callback */
// @ts-nocheck
import React from 'react';
import { GeoPlot } from './geoplot';
import './styles.sass';
import { curveData1, curveData2 } from './data';

const App: React.FC = () => {
  let plotModel;
  let plot;

  const onCreatePlot = () => {
    if (plot) {
      plot.destroy();
    }
    const plotJson = {
      name: 'Мой планшет',
      orientation: 1, // 0 - горизонтальный, 1 - вертикальный
      refType: 0, // 0 - время, 1 - глубина
      scale: 10000, // масштаб
      trackTitleVisible: true,
      wellTitleVisible: true,
    };

    plotModel = new GeoPlot.Model.PlotModel(plotJson, {});
    plot = new GeoPlot.PlotContainer(
      document.getElementById('plotDiv'),
      plotModel,
    );
    console.log(plot);

    const wells = plotModel.getWells() as unknown as any[];
    const wellJson = {
      name: 'Моя скважина',
      tracks: [
        {
          type: 'ScaleTrackModel',
          width: 60,
        },
      ],
    };
    const wellModel = new GeoPlot.Model.WellModel(wellJson, {});
    wells.push(wellModel);

    const tracks = wells[wells.length - 1].getTracks();

    const trackJson = {
      name: 'Мой трек',
      width: 150, // ширина трека в px
      curves: [],
    };
    const trackModel = new GeoPlot.Model.TrackModel(trackJson, {});
    tracks.push(trackModel);

    const propertyGrid = new GeoPlot.PropertyGrid(document.getElementById('propDiv'));
    if (propertyGrid) { // если используется окно свойств
      propertyGrid.setModel(plotModel);
      GeoPlot.getProperty(plotModel, 'selectedObject', function (sender, aValue) {
        propertyGrid.setModel(aValue);
      });
    }
  };

  const onAdd1 = () => {
    const wells = plotModel.getWells() as unknown as any[];
    const tracks = wells[wells.length - 1].getTracks();
    const curves = tracks[tracks.length - 1].getCurves();

    const curveModel = new GeoPlot.Model.CurveModel(curveData1, {});
    curves.push(curveModel);
  };

  const onAdd2 = () => {
    const wells = plotModel.getWells() as unknown as any[];
    const tracks = wells[wells.length - 1].getTracks();
    const curves = tracks[tracks.length - 1].getCurves();

    // curveData1.times = curveData1.times.concat(curveData2.times);
    // curveData1.values = curveData1.values.concat(curveData2.values);
    // const curveModel = new GeoPlot.Model.CurveModel(curveData1, {});
    // curves.push(curveModel);

    const fillJson = { ...curveData2 };
    [fillJson.indexCurve2] = curves;
    const fillModel = new GeoPlot.Model.FillModel(fillJson, curves, {});
    tracks[tracks.length - 1].getFills().push(fillModel);
  };

  return (
    <>
      <button type="button" onClick={() => onCreatePlot()}>
        PUSH ME
      </button>
      <button type="button" onClick={() => onAdd1()}>
        ADD Curve 1
      </button>
      <button type="button" onClick={() => onAdd2()}>
        ADD Curve 2
      </button>
    </>
  );
};

export default App;
