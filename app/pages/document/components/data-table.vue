<template>
  <CommonMainSection>
    <div class="document-card">
      <div class="container github-markdown-body">
        <h1>数据表格 ZyDataTable</h1>
        <p>
          数据表格是一种用于展示结构化数据的组件，支持分页、排序、多选等功能。
        </p>
        <h2>基本用法</h2>
        <p>以下是一个基本的表格示例。</p>
        <ZyCompDemo ref="basicDemoRef">
          <ZyDataTable
            :tableHeader="tableHeader"
            :tableData="tableData"
          >
            <template v-slot:cell-col1="{ row: item }">
              {{ item.col1 ? item.col1 : "--" }}
            </template>
            <template v-slot:cell-col2="{ row: item }">
              {{ item.col2 ? item.col2 : "--" }}
            </template>
          </ZyDataTable>
        </ZyCompDemo>
        <!-- 新增的多选功能介绍 -->
        <h2>多选功能</h2>
        <p>
          通过设置 <code>selection</code> 属性为
          <code>true</code>，可以开启表格的首列多选框功能。
        </p>
        <p>选中的行数据：{{ JSON.stringify(selectedRows) }}</p>
        <ZyCompDemo ref="selectionDemoRef">
          <ZyDataTable
            :tableHeader="tableHeader"
            :tableData="tableData"
            :selection="true"
            @select-change="onSelectChange"
          >
            <template v-slot:cell-col1="{ row: item }">
              {{ item.col1 ? item.col1 : "--" }}
            </template>
            <template v-slot:cell-col2="{ row: item }">
              {{ item.col2 ? item.col2 : "--" }}
            </template>
          </ZyDataTable>
        </ZyCompDemo>
        <h2>API</h2>
        <h3><code>&lt;ZyDataTable&gt;</code> Props</h3>
        <table>
          <colgroup>
            <col style="min-width: 120px" />
          </colgroup>
          <thead>
            <tr>
              <th>参数名</th>
              <th>描述</th>
              <th>类型</th>
              <th>默认值</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>tableHeader</td>
              <td>
                列标题配置，包含每列的名称、键、排序字段、是否可排序、对齐方式等信息
              </td>
              <td>Array&lt;IHeaderConfiguration&gt;</td>
              <td>-</td>
            </tr>
            <tr>
              <td>tableData</td>
              <td>表格数据</td>
              <td>Array</td>
              <td>-</td>
            </tr>
            <tr>
              <td>emptyTableText</td>
              <td>表格为空时显示的提示信息</td>
              <td>String</td>
              <td>"No data found"</td>
            </tr>
            <tr>
              <td>loading</td>
              <td>表格是否处于加载状态</td>
              <td>Boolean</td>
              <td>false</td>
            </tr>
            <tr>
              <td>selection</td>
              <td>是否开启首列多选框</td>
              <td>Boolean</td>
              <td>false</td>
            </tr>
            <tr>
              <td>showExpandBtn</td>
              <td>是否开启展开按钮</td>
              <td>Boolean</td>
              <td>false</td>
            </tr>
            <tr>
              <td>expandAll</td>
              <td>是否展开所有数据</td>
              <td>Boolean</td>
              <td>false</td>
            </tr>
            <tr>
              <td>expandInTable</td>
              <td>展开内容是否显示在主表的 tr 内</td>
              <td>Boolean</td>
              <td>true</td>
            </tr>
            <tr>
              <td>totalArray</td>
              <td>绑定到 index 的小计行数据</td>
              <td>Array&lt;TotalArrayItem&gt;</td>
              <td>[]</td>
            </tr>
            <tr>
              <td>enableCurrentPageButtons</td>
              <td>是否启用第几页调整按钮</td>
              <td>Boolean</td>
              <td>false</td>
            </tr>
            <tr>
              <td>enableItemsPerPageDropdown</td>
              <td>是否启用每页显示行数的下拉菜单</td>
              <td>Boolean</td>
              <td>false</td>
            </tr>
            <tr>
              <td>currentPage</td>
              <td>当前页码</td>
              <td>Number</td>
              <td>1</td>
            </tr>
            <tr>
              <td>rowsPerPage</td>
              <td>每页显示的行数</td>
              <td>Number</td>
              <td>200</td>
            </tr>
            <tr>
              <td>total</td>
              <td>数据总数</td>
              <td>Number</td>
              <td>0</td>
            </tr>
            <tr>
              <td>sortLabel</td>
              <td>被排序的字段</td>
              <td>String</td>
              <td>""</td>
            </tr>
            <tr>
              <td>sortOrder</td>
              <td>排序顺序（正序/倒序）</td>
              <td>String</td>
              <td>""</td>
            </tr>
            <tr>
              <td>remote</td>
              <td>是否为远程（后端）控制分页、排序</td>
              <td>Boolean</td>
              <td>false</td>
            </tr>
          </tbody>
        </table>
        <h3><code>&lt;ZyDataTable&gt;</code> Events</h3>
        <table>
          <colgroup>
            <col style="min-width: 120px" />
          </colgroup>
          <thead>
            <tr>
              <th>事件名</th>
              <th>描述</th>
              <th>参数</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>current-change</td>
              <td>当前页码改变时触发</td>
              <td>page: number</td>
            </tr>
            <tr>
              <td>sort-change</td>
              <td>排序改变时触发</td>
              <td>{ columnName: string, order?: string }</td>
            </tr>
            <tr>
              <td>items-per-page-change</td>
              <td>每页显示行数改变时触发</td>
              <td>rowsPerPage: number</td>
            </tr>
            <tr>
              <td>select-change</td>
              <td>多选框选中状态改变时触发</td>
              <td>selectedRows: Array&lt;any&gt;</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </CommonMainSection>
</template>
<script setup>
  import { ref, onMounted, onUpdated } from "vue";

  const basicDemoRef = ref(null);
  const selectionDemoRef = ref(null); // 新增 ref 用于多选示例
  const selectedRows = ref([]); // 新增 ref 用于存储选中的行数据

  const tableHeader = [
    {
      name: "列1",
      key: "col1",
      sortable: true,
      align: "left",
    },
    {
      name: "列2",
      key: "col2",
      sortable: false,
      align: "center",
    },
  ];

  const tableData = [
    { col1: "数据1", col2: "数据2" },
    { col1: "数据3", col2: "数据4" },
  ];

  const setDemoCode = () => {
    const basicDemoCode = `
<ZyDataTable
  :tableHeader="[
    {
      name: '列1',
      key: 'col1',
      sortable: true,
      align: 'left',
    },
    {
      name: '列2',
      key: 'col2',
      sortable: false,
      align: 'center',
    },
  ]"
  :tableData="[
    { col1: '数据1', col2: '数据2' },
    { col1: '数据3', col2: '数据4' },
  ]"
>
  <template v-slot:cell-col1="{ row: item }">
    {{ item.col1 ? item.col1 : "--" }}
  </template>
  <template v-slot:cell-col2="{ row: item }">
    {{ item.col2 ? item.col2 : "--" }}
  </template>
</ZyDataTable>
  `;
    if (basicDemoRef.value) {
      basicDemoRef.value.setCode(basicDemoCode);
    }

    const selectionDemoCode = `
<ZyDataTable
  :tableHeader="[
    {
      name: '列1',
      key: 'col1',
      sortable: true,
      align: 'left',
    },
    {
      name: '列2',
      key: 'col2',
      sortable: false,
      align: 'center',
    },
  ]"
  :tableData="[
    { col1: '数据1', col2: '数据2' },
    { col1: '数据3', col2: '数据4' },
  ]"
  :selection="true"
  @select-change="onSelectChange"
>
  <template v-slot:cell-col1="{ row: item }">
    {{ item.col1 ? item.col1 : "--" }}
  </template>
  <template v-slot:cell-col2="{ row: item }">
    {{ item.col2 ? item.col2 : "--" }}
  </template>
</ZyDataTable>
  `;
    if (selectionDemoRef.value) {
      selectionDemoRef.value.setCode(selectionDemoCode);
    }
  };

  const onSelectChange = (rows) => {
    console.log("选中的行数据:", rows);
    selectedRows.value = rows; // 更新 selectedRows 的值
  };

  onMounted(() => {
    setDemoCode();
  });
  onUpdated(() => {
    setDemoCode();
  });
</script>
