import Mock from "mockjs";

export default //右上
{
  url: "/bigscreen/leftTop",
  type: "get",
  response: () => {
    const a = Mock.mock({
      success: true,
      data: {
        dateList: ["检举控告", "业务范围外", "批评建议", "申诉"],
        "numList|4": ["@integer(0, 1000)"],
        "numList2|4": ["@integer(0, 1000)"]
      }
    });
    return a;
  }
};
