import { fmoney } from "@/utils/filter.js";
import dayjs from "dayjs";

export const setOptions = function (chart_data) {
  let colors = ["#396FFF", "#E4007F", "#90C31F", "#FABE00", "#CCCCCC"];
  let itemColors = {
    holiday: "#396FFF",
    activity: "#F5A623",
    zhoumo: "#E4007F"
  };
  let json = {
    视频客流量: "video_cf",
    WIFI客流量: "wifi_cf",
    活动UV: "activity_uv",
    活动PV: "activity_pv",
    会员数: "mbr_reg_count_acc",
    新增会员数: "mbr_reg_count",
    领券量: "cpn_get_count",
    领取人数: "cpn_get_persons",
    核销量: "cpn_chk_count",
    核销人数: "cpn_chk_persons"
  };
  let options = {
    color: colors,
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross"
      }
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
      }
    ],
    legend: {
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
    // yAxis: [
    //   {
    //     type: 'value',
    //     name: '数量',
    //     min: 1000,
    //     // max: 250,
    //     position: 'right',
    //     axisLine: {
    //         lineStyle: {
    //             color: '#999'
    //         }
    //     },
    //     // axisLabel: {
    //     //     formatter: '{value} ml'
    //     // }
    // },
    // {
    //     type: 'value',
    //     name: '数量',
    //     min: 0,
    //     max: 1000,
    //     position: 'left',
    //     axisLine: {
    //         lineStyle: {
    //             color: '#999'
    //         }
    //     },
    //     // axisLabel: {
    //     //     formatter: '{value} °C'
    //     // }
    // }],
    series: []
  };

  options.legend.data = Object.keys(json);
  options.legend.data.map((item, index) => {
    if (index < 4) {
      options.legend.selected[item] = true;
    } else {
      options.legend.selected[item] = false;
    }
  });

  options.xAxis[0].data = (() => {
    let chartData = [];

    if (chart_data.length > 0) {
      let moreDay = dayjs(
        chart_data[chart_data.length - 1].stat_ymd
      )
        .add(1, "day")
        .format("YYYY-MM-DD");
      chartData = chart_data.concat([
        {
          stat_ymd: moreDay,
          week: dayjs(moreDay).day()
        }
      ]);
    }

    let data = [];
    chartData.forEach(item => {
      data.push({
        value: item.stat_ymd,
        textStyle: {
          color: item.week == "6" || item.week == "0" ? "#E4007F" : "#999"
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
    let name = item.action_name || item.holiday_name || item.zhoumo;
    if (!name) return;
    if (!holidayObjs[name]) {
      holidayObjs[name] = {};
      holidayObjs[name].type = item.action_name
        ? "activity"
        : item.holiday_name ? "holiday" : "zhoumo";
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
        name: key,
        xAxis: holidayObjs[key].startTime,
        itemStyle: {
          color: itemColors[holidayObjs[key].type],
          opacity: 0.16
        },
        label: {
          offset: [0, 0],
          fontSize: 16,
          color: itemColors[holidayObjs[key].type]
        }
      },
      {
        xAxis: holidayObjs[key].endTime
      }
    ]);
  }

  let chart_series = [];
  options.legend.data.forEach(item => {
    chart_series.push({
      name: item,
      type: "line",
      smooth: true,
      label: {
        show: true,
        position: "top",
        color: "auto",
        formatter: param => {
          return fmoney(param.value, 0);
        }
      },
      markArea: areaStyle,
      data: chart_data.map(data => data[json[item]])
    });
  });

  options.series = chart_series;
  return options;
}