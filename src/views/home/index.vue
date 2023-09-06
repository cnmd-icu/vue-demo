<template>
  <div class="index-box">
    <div class="contetn_left">
      <ItemWrap class="top" title="数据分析">
        <LeftTop />
      </ItemWrap>
      <ItemWrap class="center" title="用户总览">
        <LeftCenter />
      </ItemWrap>
      <ItemWrap class="bottom" title="数据分析">
        <LeftBottom />
      </ItemWrap>
    </div>
    <div class="contetn_center">
      <CenterMap class="center_top" title="句容市" />
      <ItemWrap class="center-bottom" title="安装计划" style="height: 300px">
        <CenterBottom />
      </ItemWrap>
    </div>
    <div class="contetn_right">
      <ItemWrap class="top" title="报警次数" style="height: 350px">
        <RightTop />
      </ItemWrap>
      <ItemWrap class="bottom" title="数据统计图 " style="height: 80%">
        <RightBottom />
      </ItemWrap>
    </div>
  </div>
</template>
