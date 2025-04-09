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
            :rowsPerPage="2"
          >
            <template v-slot:cell-col1="{ row: item }">
              {{ item.col1 ? item.col1 : "--" }}
            </template>
            <template v-slot:cell-col2="{ row: item }">
              {{ item.col2 ? item.col2 : "--" }}
            </template>
          </ZyDataTable>
        </ZyCompDemo>
        <h2>空状态</h2>
        <p>
          当表格没有数据时，可以通过设置
          <code>emptyTableText</code> 属性来显示空状态。
        </p>
        <ZyCompDemo ref="emptyDemoRef">
          <ZyDataTable
            :tableHeader="tableHeader"
            emptyTableText="曼波...暂无数据喵~"
          >
            <template v-slot:cell-col1="{ row: item }">
              {{ item.col1 ? item.col1 : "--" }}
            </template>
            <template v-slot:cell-col2="{ row: item }">
              {{ item.col2 ? item.col2 : "--" }}
            </template>
          </ZyDataTable>
        </ZyCompDemo>
        <h2>加载中状态</h2>
        <p>
          当表格正在加载数据时，可以通过设置
          <code>loading</code> 属性为 <code>true</code> 来显示加载中状态。
        </p>
        <ZyCompDemo ref="loadingDemoRef">
          <ZyDataTable
            :tableHeader="tableHeader"
            :loading="true"
          >
            <template v-slot:cell-col1="{ row: item }">
              {{ item.col1 ? item.col1 : "--" }}
            </template>
            <template v-slot:cell-col2="{ row: item }">
              {{ item.col2 ? item.col2 : "--" }}
            </template>
          </ZyDataTable>
        </ZyCompDemo>
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
            :rowsPerPage="2"
          >
            <template v-slot:cell-col1="{ row: item }">
              {{ item.col1 ? item.col1 : "--" }}
            </template>
            <template v-slot:cell-col2="{ row: item }">
              {{ item.col2 ? item.col2 : "--" }}
            </template>
          </ZyDataTable>
        </ZyCompDemo>
        <h2>分页功能（支持本地 & 远程）</h2>
        <p>
          第一步<span style="color: red">*</span>：通过设置
          <code>enableCurrentPageButtons</code> 属性为
          <code>true</code>，可以开启表格的第几页控制按钮（右下角）。
        </p>
        <p>
          第二步：通过设置 <code>enableItemsPerPageDropdown</code> 属性为
          <code>true</code>，可以开启分页大小调整的的下拉菜单（左下角）。
        </p>
        <p>表格的分页功能分为本地分页和远程分页两种模式。</p>
        <p>
          第三步<span style="color: red">*</span>：需要设置
          <code>rowsPerPage</code>
          每页显示的行数，表格会自动计算并显示分页信息。在本地分页模式下，表格的数据长度是通过
          <code>tableData</code> 传入的数据总数。
        </p>
        <p>
          通过设置 <code>remote</code> 属性为
          <code>true</code>，可以开启远程分页模式。
        </p>
        <p>
          第四步：而在远程分页模式下，通过设置
          <code>currentPage</code> 当前页码，<code>rowsPerPage</code>
          每页显示的行数，<code>total</code>
          数据总数，可以更精细的控制表格的分页，并能优化数据量大时的数据传输长度。
        </p>
        <ZyCompDemo ref="paginationDemoRef">
          <ZyDataTable
            :tableHeader="tableHeader"
            :tableData="tableData"
            :enableCurrentPageButtons="true"
            :enableItemsPerPageDropdown="true"
          >
            <template v-slot:cell-col1="{ row: item }">
              {{ item.col1 ? item.col1 : "--" }}
            </template>
            <template v-slot:cell-col2="{ row: item }">
              {{ item.col2 ? item.col2 : "--" }}
            </template>
          </ZyDataTable>
        </ZyCompDemo>
        <h2>排序功能（支持本地 & 远程）</h2>
        <p>
          必须<span style="color: red">*</span>：需要设置
          <code>tableHeader</code> 列标题配置，将需要排序的字段的
          <code>sortable</code> 设置为 <code>true</code> ，
          <code>key</code> 严格地设置为
          <code>数据中该字段的字段名</code> ，可以开启表格的排序功能。
        </p>
        <p>表格的排序功能分为本地排序和远程排序两种模式。</p>
        <p>
          在本地排序模式下，直接点击列表头中可以排序的字段名，即可实现排序。<br />
          本地排序规则：<br />
          <strong>同一个字段</strong
          >：第一次点击正序，第二次点击倒序，第三次点击还原默认顺序。<br />
          <strong>不同字段</strong
          >：点击后，取消其他字段的排序，只对当前点击的字段，按上一条规则排序。
        </p>
        <p>
          通过设置 <code>remote</code> 属性为
          <code>true</code>，可以开启远程排序模式。
        </p>
        <p>
          在远程排序模式下，需要接收
          <code>sortChange</code> 事件，在事件中处理排序逻辑，并通过 Props
          控制表格组件的显示。其中，<code>sortLabel</code> 为排序字段名，<code
            >sortOrder</code
          >
          为排序方式。
        </p>
        <ZyCompDemo ref="sortDemoRef">
          <ZyDataTable
            :tableHeader="tableHeaderWithSort"
            :tableData="tableData"
            :enableCurrentPageButtons="true"
            :enableItemsPerPageDropdown="true"
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
              <td>-</td>
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
              <td>-</td>
            </tr>
            <tr>
              <td>rowsPerPage</td>
              <td>每页显示的行数</td>
              <td>Number</td>
              <td>-</td>
            </tr>
            <tr>
              <td>total</td>
              <td>数据总数</td>
              <td>Number</td>
              <td>-</td>
            </tr>
            <tr>
              <td>sortLabel</td>
              <td>被排序的字段</td>
              <td>String</td>
              <td>-</td>
            </tr>
            <tr>
              <td>sortOrder</td>
              <td>排序顺序（正序/倒序）</td>
              <td>"desc" | "asc"</td>
              <td>-</td>
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
  const emptyDemoRef = ref(null);
  const loadingDemoRef = ref(null);
  const selectionDemoRef = ref(null);
  const selectedRows = ref([]);
  const paginationDemoRef = ref(null);
  const sortDemoRef = ref(null);

  const tableHeader = [
    {
      name: "列1",
      key: "col1",
      sortable: false,
      align: "left",
    },
    {
      name: "列2",
      key: "col2",
      sortable: false,
      align: "left",
    },
  ];
  const tableHeaderWithSort = [
    {
      name: "列1",
      key: "col1",
      sortable: true,
      align: "left",
    },
    {
      name: "列2",
      key: "col2",
      sortable: true,
      align: "left",
    },
  ];

  const tableData = [
    { col1: "数据1", col2: "数据2" },
    { col1: "数据3", col2: "数据4" },
    { col1: "数据5", col2: "数据6" },
    { col1: "数据7", col2: "数据8" },
    { col1: "数据9", col2: "数据10" },
    { col1: "数据11", col2: "数据12" },
    { col1: "数据13", col2: "数据14" },
    { col1: "数据15", col2: "数据16" },
    { col1: "数据17", col2: "数据18" },
    { col1: "数据19", col2: "数据20" },
    { col1: "数据21", col2: "数据22" },
    { col1: "数据23", col2: "数据24" },
    { col1: "数据25", col2: "数据26" },
    { col1: "数据27", col2: "数据28" },
    { col1: "数据29", col2: "数据30" },
    { col1: "数据31", col2: "数据32" },
    { col1: "数据33", col2: "数据34" },
    { col1: "数据35", col2: "数据36" },
    { col1: "数据37", col2: "数据38" },
    { col1: "数据39", col2: "数据40" },
  ];

  const setDemoCode = () => {
    const basicDemoCode = `
<ZyDataTable
  :tableHeader="[
    {
      name: '列1',
      key: 'col1',
      sortable: false,
      align: 'left',
    },
    {
      name: '列2',
      key: 'col2',
      sortable: false,
      align: 'left',
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

    const emptyDemoCode = `
<ZyDataTable
  :tableHeader="[
    {
      name: '列1',
      key: 'col1',
      sortable: false,
      align: 'left',
    },
    {
      name: '列2',
      key: 'col2',
      sortable: false,
      align: 'left',
    },
  ]"
  emptyTableText="曼波...暂无数据喵~"
>
  <template v-slot:cell-col1="{ row: item }">
    {{ item.col1 ? item.col1 : "--" }}
  </template>
  <template v-slot:cell-col2="{ row: item }">
    {{ item.col2 ? item.col2 : "--" }}
  </template>
</ZyDataTable>
    `;

    if (emptyDemoRef.value) {
      emptyDemoRef.value.setCode(emptyDemoCode);
    }

    const loadingDemoCode = `
<ZyDataTable
  :tableHeader="tableHeader"
  :loading="true"
>
  <template v-slot:cell-col1="{ row: item }">
    {{ item.col1 ? item.col1 : "--" }}
  </template>
  <template v-slot:cell-col2="{ row: item }">
    {{ item.col2 ? item.col2 : "--" }}
  </template>
</ZyDataTable>
    `;

    if (loadingDemoRef.value) {
      loadingDemoRef.value.setCode(loadingDemoCode);
    }

    const selectionDemoCode = `
<ZyDataTable
  :tableHeader="[
    {
      name: '列1',
      key: 'col1',
      sortable: false,
      align: 'left',
    },
    {
      name: '列2',
      key: 'col2',
      sortable: false,
      align: 'left',
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

    const paginationDemoCode = `
<ZyDataTable
  :tableHeader="[
    {
      name: '列1',
      key: 'col1',
      sortable: false,
      align: 'left',
    },
    {
      name: '列2',
      key: 'col2',
      sortable: false,
      align: 'left',
    },
  ]"
  :tableData="[
    { col1: '数据1', col2: '数据2' },
    { col1: '数据3', col2: '数据4' },
    { col1: "数据5", col2: "数据6" },
    { col1: "数据7", col2: "数据8" },
    { col1: "数据9", col2: "数据10" },
    { col1: "数据11", col2: "数据12" },
    { col1: "数据13", col2: "数据14" },
    { col1: "数据15", col2: "数据16" },
    { col1: "数据17", col2: "数据18" },
    { col1: "数据19", col2: "数据20" },
  ]"
  :enableCurrentPageButtons="true"
  :enableItemsPerPageDropdown="true"
>
  <template v-slot:cell-col1="{ row: item }">
    {{ item.col1 ? item.col1 : "--" }}
  </template>
  <template v-slot:cell-col2="{ row: item }">
    {{ item.col2 ? item.col2 : "--" }}
  </template>
</ZyDataTable>
    `;

    if (paginationDemoRef.value) {
      paginationDemoRef.value.setCode(paginationDemoCode);
    }

    const sortDemoCode = `
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
      sortable: true,
      align: 'left',
    },
  ]"
  :tableData="[
    { col1: '数据1', col2: '数据2' },
    { col1: '数据3', col2: '数据4' },
    { col1: "数据5", col2: "数据6" },
    { col1: "数据7", col2: "数据8" },
    { col1: "数据9", col2: "数据10" },
    { col1: "数据11", col2: "数据12" },
    { col1: "数据13", col2: "数据14" },
    { col1: "数据15", col2: "数据16" },
    { col1: "数据17", col2: "数据18" },
    { col1: "数据19", col2: "数据20" },
    { col1: "数据21", col2: "数据22" },
    { col1: "数据23", col2: "数据24" },
    { col1: "数据25", col2: "数据26" },
    { col1: "数据27", col2: "数据28" },
    { col1: "数据29", col2: "数据30" },
    { col1: "数据31", col2: "数据32" },
    { col1: "数据33", col2: "数据34" },
    { col1: "数据35", col2: "数据36" },
    { col1: "数据37", col2: "数据38" },
    { col1: "数据39", col2: "数据40" },
  ]"
  :enableCurrentPageButtons="true"
  :enableItemsPerPageDropdown="true"
>
  <template v-slot:cell-col1="{ row: item }">
    {{ item.col1 ? item.col1 : "--" }}
  </template>
  <template v-slot:cell-col2="{ row: item }">
    {{ item.col2 ? item.col2 : "--" }}
  </template>
</ZyDataTable>
    `;

    if (sortDemoRef.value) {
      sortDemoRef.value.setCode(sortDemoCode);
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
