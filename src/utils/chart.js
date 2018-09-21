import { fmoney, sort, isNumber } from "@/utils/filter.js";
import dayjs from "dayjs";

export const setOptions = function(type, option) {
  let colors = [
    "#396FFF",
    "#90C31F",
    "#FABE00",
    "#F78345",
    " #E4007F",
    "#62A1FF",
    "#4ED4FF",
    "#C66FFF",
    "#1F7EBF",
    "#7693FF",
    "#FF6EBF"
  ];
  let itemColors = {
    holiday: "#d1daf3",
    zhoumo: "#fcf1e0",
    activity: "#E4007F"
  };
  let weatherIconSize = 36;

  var dims = {
    ymd: 0,
    windSpeed: 1,
    R: 2,
    waveHeight: 3,
    weatherIcon: 2,
    l_temp: 3,
    h_temp: 4,
    weather: 5,
  };

  let chart_data = option.chart_data;
  let json = option.json;
  let legendSel = option.legendSel;

  if (type === "activity") {
    json = {
      视频客流量: "video_cf",
      WIFI客流量: "wifi_cf",
      活动UV: "activity_uv",
      活动PV: "activity_pv",
      新增会员数: "mbr_reg_count",
      领券量: "cpn_get_count",
      领取人数: "cpn_get_persons",
      核销量: "cpn_chk_count",
      核销人数: "cpn_chk_persons"
    };
  }

  let options = {
    color: colors,
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross"
      },
      formatter: function(param) {
        var htmlStr = "";
        if (param && param.length > 0) {
          htmlStr +=
            '<div style="width:180px;font-size:10px;padding:5px;"><div>' +
            param[0].axisValue +
            "</div>";
          param.forEach(function(item, index) {
            htmlStr +=
              '<div><span style="display:inline-block;white-space: normal;word-wrap: break-word;word-break: break-all;width:10px;height:10px;border-radius:5px;background:' +
              colors[param[index].data.color] +
              ';"></span> ' +
              item.seriesName +
              ": " +
              item.value +
              "</div>";
          });
          let content = param[0].data.content;
          let holiday = param[0].data.holiday;
          if (holiday) {
            htmlStr +=
              '<div style="border-top:1px dotted white;margin-top:5px;padding:5px 0 0 0;font-weight:bold;"> ' +
              (holiday ? holiday : "") +
              "</div>";
          }
          htmlStr +=
            '<div style="border-top:1px dotted white; padding:5px 0;margin-top:5px;white-space: normal;word-wrap: break-word;word-break: break-all;">[日志] ' +
            (content ? content : "") +
            "</div></div>";
        }

        return htmlStr;
      }
    },
    grid: {
      top: 150,
      bottom: 125
    },
    xAxis: [
      {
        type: "category",
        axisTick: {
          alignWithLabel: true
        },
        axisLabel: {
          formatter: value => {
            return dayjs(value).format("MM.DD");
          }
        },
        data: []
      },
      {
        type: "category",
        offset: "20",
        axisTick: {
          alignWithLabel: true
        },
        axisLine: {
          show: false,
          onZero: false,
          lineStyle: {
            color: colors[0]
          }
        },
        axisLabel: {
          formatter: value => {
            if (!value.l_temp || !value.h_temp) return;
            return `${value.l_temp}-${value.h_temp}`;
          }
        },
        axisTick: {
          show: false
        },
        axisPointer: {
          label: {
            formatter: function(params) {
              return (
                "降水量  " +
                params.value +
                (params.seriesData.length
                  ? "：" + params.seriesData[0].data
                  : "")
              );
            }
          }
        },
        data: []
      }
    ],
    legend: {
      height: 100,
      selectedMode: "multiple",
      selected: {}
    },
    yAxis: {
      type: "value",
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        textStyle: {
          color: "#999"
        }
      }
    },
    dataZoom: [
      {
        type: "inside",
        xAxisIndex: 0,
        minSpan: 5,
        // start: 30,
        // end: 85,
      },
      {
        type: "slider",
        xAxisIndex: 0,
        minSpan: 5,
        height: 20,
        bottom: 50,
        // start: 30,
        // end: 85,
        handleIcon:
          "M10.7,11.9H9.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4h1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z",
        // handleSize: "120%"
      }
    ],
    series: []
  };
  var weatherData = chart_data.map(function(entry) {
    if(entry.weather){
      var wea = entry.weather;
      var weaStr = '';
      if(wea.weather_id < 24){
         weaStr = require (`../assets/weather/icon-${entry.weather.weather_id}.png`);
      }
      return [wea.ymd,0,weaStr,wea.l_temp,wea.h_temp,wea.weather];
    }
    return [];
  });
  function renderWeather(param, api) {
    var point = api.coord([api.value(dims.ymd), 0]);
    return {
      type: "group",
      children: [
        {
          type: "image",
          style: {
            image: api.value(dims.weatherIcon),
            x: -weatherIconSize / 2,
            y: -weatherIconSize / 2,
            width: weatherIconSize,
            height: weatherIconSize
          },
          position: [point[0], 110]
        },
        {
          type: "text",
          style: {
            text: `${api.value(dims.l_temp) || ''}${api.value(dims.l_temp) ? '~' : ''}${api.value(dims.h_temp) || ''}${api.value(dims.h_temp) ? '°C' : ''}`,
            textFont: api.font({ fontSize: 12 }),
            fill: "#999",
            textAlign: "center",
            textVerticalAlign: "bottom"
          },
          position: [point[0], 70]
        },
        {
          type: "text",
          style: {
            text: `${api.value(dims.weather) || ''}`,
            textFont: api.font({ fontSize: 12 }),
            fill: "#ccc",
            textAlign: "center",
            textVerticalAlign: "bottom"
          },
          position: [point[0], 90]
        }
      ]
    };
  }

  options.legend.data = Object.keys(json);
  if (Array.isArray(legendSel)) {
    options.legend.data.map((item, index) => {
      if (index < 4) {
        options.legend.selected[item] = true;
      } else {
        options.legend.selected[item] = false;
      }
    });
  } else {
    options.legend.data.map(item => {
      options.legend.selected[item] = legendSel[item];
    });
  }

  options.xAxis[0].data = (() => {
    let chartData = [];

    if (chart_data.length > 0) {
      // let moreDay = dayjs(chart_data[chart_data.length - 1].stat_ymd)
      //   .add(1, "day")
      //   .format("YYYY-MM-DD");
      // chartData = chart_data.concat([
      //   {
      //     stat_ymd: moreDay,
      //     week: dayjs(moreDay).day()
      //   }
      // ]);
      chartData = chart_data
    }

    let data = [];
    chartData.forEach(item => {
      data.push({
        value: item.stat_ymd,
        textStyle: {
          // color: item.week == "6" || item.week == "0" ? "#E4007F" : "#999"
          color: "#999"
        }
      });
    });
    return data;
  })();

  options.xAxis[0].data.map(item => item.value).sort(function(a, b) {
    return new Date(a) - new Date(b);
  });

  var areaStyle = {
    silent: false,
    data: []
  };

  let holidayObjs = {};

  chart_data.forEach(item => {
    let name = "";
    if (item.holiday_name) {
      name = item.holiday_name;
    } else if (item.week == 6) {
      name = `${item.stat_ymd}_${item.week}`;
    }
    if (!name) return;
    if (!holidayObjs[name]) {
      holidayObjs[name] = {};
      // holidayObjs[name].type = item.content
      //   ? "activity"
      //   : item.holiday_name ? "holiday" : "zhoumo";
      holidayObjs[name].type = item.holiday_name ? "holiday" : "zhoumo";
      holidayObjs[name].startTime = item.stat_ymd;
    } else {
      holidayObjs[name].endTime = dayjs(item.stat_ymd)
        .add(1, "day")
        .format("YYYY-MM-DD");
    }
  });

  for (let key in holidayObjs) {
    if (!holidayObjs[key].endTime) {
      holidayObjs[key].endTime = dayjs(holidayObjs[key].startTime)
        .add(1, "day")
        .format("YYYY-MM-DD");
    }
    areaStyle.data.push([
      {
        name: key.indexOf("_6") >= 0 ? "周末" : key,
        xAxis: holidayObjs[key].startTime,
        itemStyle: {
          color: itemColors[holidayObjs[key].type],
          opacity: 1
        },
        label: {
          // show: false,
          offset: [0, 0],
          fontSize: 12,
          color: itemColors[holidayObjs[key].type]
        }
      },
      {
        xAxis: holidayObjs[key].endTime
      }
    ]);
  }

  let chart_series = [];
  options.legend.data.forEach((item, index) => {
    chart_series.push({
      name: item,
      type: "line",
      smooth: true,
      label: {
        // show: true,
        position: "top",
        color: "auto",
        formatter: param => {
          return fmoney(param.value, 0);
        }
      },
      markArea: areaStyle,
      markPoint: {
        animation: true,
        animationDuration: "5000",
        animationEasing: "elasticOut",
        label: {
          show: true
        },
        symbolOffset: [0, -10],
        data: (chart_data => {
          let cooarr = [];
          sort([...chart_data], json[item])
            .slice(0, 10)
            .forEach(data => {
              cooarr.push({
                coord: [data.stat_ymd, data[json[item]]],
                value: data[json[item]],
                label: {
                  show: true,
                  fontSize: 14,
                  color: colors[index]
                },
                symbolSize: 1,
                color: "#fff"
              });
            });
          return cooarr;
        })(chart_data)
      },
      data: (() => {
        let list = chart_data.map(data => {
          return {
            value: data[json[item]],
            content: data.content,
            color: index,
            holiday: data.holiday_name
          };
        });
        return list;
      })()
    });
  });

  chart_series.push({
    name: "weather",
    type: "custom",
    renderItem: renderWeather,
    data: weatherData,
    tooltip: {
      trigger: "item",
      formatter: function(param) {
        return (
          param.value[dims.ymd] +
          ": " +
          param.value[dims.l_temp] +
          " - " +
          param.value[dims.h_temp] +
          "°C"
        );
      }
    },
    z: 11
  });
  options.series = chart_series;
  return options;
};
