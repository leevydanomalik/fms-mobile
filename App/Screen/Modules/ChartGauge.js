import React, { Component } from 'react';
import { Text, View } from 'react-native';
import Svg, { G, Circle, Line, Polygon, Use, Defs, Rect } from "react-native-svg";

export default class ChartGauge extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     points: props.currentValue,
  //   };
  // }
  renderDial = opts => {
    let offset = opts.circumference * (1 - 100 / 200);

    return (
      <Circle
        cx={opts.cX}
        cy={opts.cY}
        r={opts.radius}
        fill="none"
        stroke={opts.dialColor}
        strokeWidth={opts.dialWidth}
        strokeDasharray={opts.circumference}
        strokeDashoffset={offset}
        strokeLinecap={opts.progressRoundedEdge ? "round" : "butt"}
      />
    );
  };

  renderProgress = opts => {
    let offset = opts.circumference * (1 - opts.currentValue / 200);

    return (
      <Circle
        cx={opts.cX}
        cy={opts.cY}
        r={opts.radius}
        fill="none"
        stroke={opts.progressColor}
        strokeWidth={opts.progressWidth}
        strokeDasharray={opts.circumference}
        strokeDashoffset={offset}
        strokeLinecap={opts.progressRoundedEdge ? "round" : "butt"}
      />
    );
  };

  renderTicks = opts => {
    let tickAngles = [];
    for (let i = 0; i <= 360; i += opts.tickInterval) {
      tickAngles.push(i);
    }
    return (
      <G className="ticks">
        {tickAngles.map((tickAngle, idx) => {
          return (
            <Use
              href={`#${TICK_ID}`}
              key={`tick-${idx}`}
              transform={`rotate(${tickAngle} ${opts.cX} ${opts.cY})`}
            />
          );
        })}
      </G>
    );
  };

  renderNeedle = opts => {
    let x1 = opts.cX,
      y1 = opts.cY - opts.needleWidth / 2,
      x2 = opts.cX,
      y2 = opts.cY + opts.needleWidth / 2,
      x3 = opts.diameter - 15,
      y3 = opts.cY,
      needleAngle = 180 * opts.currentValue / 100;

    let needleElm = null;
    if (opts.needleSharp) {
      needleElm = (
        <Polygon
          points={`${x1},${y1} ${x2},${y2} ${x3},${y3}`}
          fill={opts.needleColor}
        />
      );
    } else {
      needleElm = (
        <Line
          x1={opts.cX}
          y1={opts.cY}
          x2={opts.diameter}
          y2={opts.cY}
          fill="none"
          strokeWidth={10}
          stroke={opts.needleColor}
        />
      );
    }
    return (
      <G className="needle">
        <G transform={`rotate(${needleAngle} ${opts.cX} ${opts.cY})`}>
          {needleElm}
        </G>
        <Circle
          cx={opts.cX}
          cy={opts.cY}
          r={opts.needleBaseSize}
          fill={opts.needleBaseColor}
        />
      </G>
    );
  };

  renderText = opts => {
    return (
      <Text
        style={{
          position: 'absolute',
          top: opts.cX + 25,
          width: '100%',
          textAlign: 'center',
          margin: 'auto',
          fontSize: 38,
          color: opts.textColor
        }}
        textAnchor="middle"
      >
        {opts.currentValue}
      </Text>
    );
  };

  render() {
    let opts = Object.assign({}, this.props);
    let { size, dialWidth, containerStyle } = opts;
    let cX = size / 2;
    let cY = 100;
    let radius = (size - 1 * dialWidth) / 2;
    let diameter = 2 * radius;
    let circumference = 2 * Math.PI * radius;
    opts = Object.assign(opts, {
      cX,
      cY,
      radius,
      diameter,
      circumference
    });

    return (
      <View style={[containerStyle, {
        // backgroundColor: 'transparent',
        // borderRadius: 16,
      }]}>
        <View style={{alignItems: 'center', }}>
          <Svg
            width={size}
            height={size}
            viewBox={`0 0 ${size} ${size}`}>
            <G transform={`rotate(-180 ${cX} ${cY})`}>
              {this.renderDial(opts)}
              {this.renderProgress(opts)}
              {this.renderNeedle(opts)}
              {this.renderText(opts)}
            </G>
          </Svg>
        </View>
      </View>
    );
  }
}

ChartGauge.defaultProps = {
  containerStyle: {},
  size: 200,
  textColor: '#333',

  dialWidth: 15,
  dialColor: "#f5f5f5",

  // tickLength: 3,
  // tickWidth: 1,
  // tickColor: "#cacaca",
  // tickInterval: 10,

  maximumValue: 100,
  currentValue: 25,
  progressWidth: 15,
  progressColor: "#2B9133",
  progressRoundedEdge: false,
  downProgressColor: "red",
  progressFont: "Serif",
  progressFontSize: "40",

  needle: true,
  needleBaseSize: 13,
  needleBaseColor: "#2B9133",
  needleWidth: 26,
  needleSharp: true,
  needleColor: "#2B9133"
};