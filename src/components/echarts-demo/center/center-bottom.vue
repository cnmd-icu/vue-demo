<script setup lang="ts">
import { ref } from "vue";
const props = defineProps({
  tableData: {
    type: Array,
    default: () => []
  },
  option: {
    type: Object,
    default: () => {}
  }
});

const tableData = ref(<any>props.tableData);
const option = reactive({
  total: 100,
  pageNum: 1,
  pageSize: 10
});

const getTableData = () => {
  for (let i = option.pageSize * (option.pageNum - 1); i < option.pageSize * option.pageNum; i++) {
    tableData.value.push({
      id: i + 1,
      name: "张三",
      unit: "市委组织部",
      department: "党建办公室",
      num: 1,
      time: "2021-08-01"
    });
  }
}
onMounted(() => {
  getTableData();
});

watch(
  () => option.pageNum,
  () => {
    tableData.value = [];
    getTableData();
  }
);
</script>

<template>
  <table class="chart" border="0">
    <thead>
      <tr>
        <th>序号</th>
        <th>编号</th>
        <th>调查人</th>
        <th>单位</th>
        <th>部门</th>
        <th>数量</th>
        <th>时间</th>
      </tr>
    </thead>
    <div class="table-container">
      <tbody>
        <tr v-for="(item, index) in tableData" :key="index">
          <td>{{ index + 1 }}</td>
          <td>{{ item.id }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.unit }}</td>
          <td>{{ item.department }}</td>
          <td>{{ item.num }}</td>
          <td>{{ item.time }}</td>
        </tr>
      </tbody>
      <tfoot>
        <ul>
          <li @click="option.pageNum--"><a href="#">&lt;</a></li>
          <li v-for="item in option.pageSize" :key="item" @click="option.pageNum = item">
            <template v-if="option.pageNum <= 3">
              <a :class="option.pageNum === item ? 'active' : ''" href="#">{{ item }}</a>
            </template>
            <template v-else-if="option.pageNum > 3 && option.pageNum <= option.total / option.pageSize - 2">
              <a :class="option.pageNum === item ? 'active' : ''" href="#">{{ item + option.pageNum - 3 }}</a>
            </template>
            <template v-else-if="option.pageNum > option.total / option.pageSize - 2">
              <a :class="option.pageNum === item ? 'active' : ''" href="#">{{ item + option.total / option.pageSize - 5 }}</a>
            </template>
          </li>
          <li @click="option.pageNum++"><a href="#">&gt;</a></li>
          <li><input type="text" v-model="option.pageNum"/></li>
        </ul>
      </tfoot>
    </div>
  </table>
</template>

<style lang="scss" scoped>
$color: #fff;
$background: #021e4e;
$background-ntn: #06183a;
$background-hover: #080b18;
$color-hover: #fff;

table thead,
table tbody,
table tfoot {
  display: table;
  width: 100%;
  table-layout: fixed;
}
.table-container {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  scrollbar-width: none; /* 隐藏滚动条 Firefox */
  -ms-overflow-style: none; /* 隐藏滚动条 IE 和 Edge */
  tfoot {
    background: $background;
    ul {
      width: 92%;
      height: 80px;
      display: flex;
      justify-content: flex-end;
    }
    ul li {
      list-style: none;
    }
    ul li a,input {
      text-decoration: none;
      position: relative;
      display: block;
      width: 40px;
      height: 40px;
      font-size: 20px;
      text-align: center;
      line-height: 40px;
      background: $background;
      color: $color;
      margin: 5px;
      border-radius: 4px;
      box-shadow: inset 0 5px 10px rgba(0, 0, 0, 0.1), 0 2px 5px rgba(0, 0, 0, 0.5);
      transition: all 300ms;
    }

    ul li a.active,
    ul li a:hover {
      color: #fff;
      text-shadow: 0 0 20px #2562ef, 0 0 20px #2562ef, 0 0 20px #2562ef, 0 0 20px #2562ef, 0 0 20px #2562ef, 0 0 20px #2562ef,
        0 0 20px #2562ef, 0 0 20px #2562ef;
    }
  }
}
.table-container::-webkit-scrollbar {
  display: none; /* 隐藏滚动条 Chrome 和 Safari */
}

.chart {
  width: 100%;
  height: 95%;
  overflow: hidden;
  border-radius: 3px;
  background-color: rgba(0, 0, 0, 0);
  border-collapse: collapse;
  border-spacing: 0;
  box-shadow: 0 2px 5px rgba(113, 113, 113, 0.5);

  thead {
    position: sticky;
    top: 0;
    z-index: 1;
    background-color: $background;
    color: $color;
    box-shadow: 0 2px 5px rgba(113, 113, 113, 0.5);
    font-size: 14px;
    font-weight: 400;
    line-height: 20px;
    text-align: center;
    th {
      padding: 10px 0;
    }
  }
}
tbody {
  width: 100%;
  height: 100%;
  background-color: $background;
  color: $color;
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  text-align: center;
  tr {
    td {
      padding: 10px 0;
    }
    &:nth-child(odd) {
      background-color: $background-ntn;
    }
    &:hover {
      color: $color-hover;
      background-color: $background-hover;
    }
  }
}
</style>
