<template>
  <!-- 表格容器 -->
  <div class="relative">
    <!-- 表格区域 -->
    <div>
      <!-- 表格元素，使用了 Tailwind CSS 类进行样式设置 -->
      <table class="zy-data-table table w-full mb-4 border-collapse">
        <!--begin::Table head-->
        <thead
          :class="{
            'opacity-20': loading,
          }"
        >
          <!--begin::Table row-->
          <!-- 表格头部行，设置了文本样式、字体加粗、大小写转换和边框样式 -->
          <tr
            class="text-text-2 landscape:font-bold portrait:text-xs uppercase border-b border-dashed border-borderColor"
          >
            <!-- 如果开启了多选框，则显示多选框列 -->
            <th
              v-if="selection"
              class="py-4 pr-4"
            >
              <!-- 点击标签时触发全选/反选操作 -->
              <label @click.stop="toggleAllSelect">
                <!-- 多选框组件，双向绑定全选状态 -->
                <UCheckbox v-model="isAllChecked" />
              </label>
            </th>
            <!-- 循环渲染表格头部列 -->
            <template
              v-for="(cell, i) in tableHeader"
              :key="i"
            >
              <!-- 列标题，点击时触发排序操作 -->
              <th
                @click="
                  sort(
                    cell.sortingField ? cell.sortingField : cell.key,
                    cell.sortable,
                  )
                "
                :class="[
                  cell.sortable !== false && 'sorting',
                  currentSort ===
                    `${cell.sortingField ? cell.sortingField : cell.key}desc` &&
                    'sorting_desc',
                  currentSort ===
                    `${cell.sortingField ? cell.sortingField : cell.key}asc` &&
                    'sorting_asc',
                  (cell.align == 'left' || cell.align === undefined) &&
                    'text-start',
                  cell.align == 'center' && 'text-center',
                  cell.align == 'right' && 'text-end',
                  cell.key == 'actions' && 'text-end',
                  'py-4',
                  i === 0 && 'pl-4',
                  i === tableHeader.length - 1 && 'pr-4',
                  cell.columnClass && cell.columnClass.split(' '),
                ]"
                tabindex="0"
                rowspan="1"
                :colspan="cell.key == 'actions' && showExpandBtn ? 2 : 1"
                :style="{
                  cursor: cell.sortable !== false ? 'pointer' : 'default',
                  ...(cell.offset
                    ? {
                        [cell.align === 'right'
                          ? 'padding-right'
                          : 'padding-left']: `${cell.offset}`,
                      }
                    : {}),
                }"
              >
                <!-- 显示列标题名称或键名 -->
                {{ cell.name || cell.key }}
              </th>
            </template>
          </tr>
          <!--end::Table row-->
        </thead>
        <!--end::Table head-->
        <!--begin::Table body-->
        <!-- 表格主体，设置了字体样式 -->
        <tbody
          class="landscape:font-bold portrait:text-sm"
          :class="{
            'opacity-0': loading,
          }"
        >
          <!-- 如果有数据，则循环渲染表格行 -->
          <template v-if="rowsData.length">
            <!-- 循环渲染表格数据行 -->
            <template
              v-for="(item, i) in rowsData"
              :key="i"
            >
              <!-- 表格数据行，设置了边框样式 -->
              <tr class="border-b border-dashed border-borderColor">
                <!-- 如果开启了多选框，则显示多选框列 -->
                <td
                  v-if="selection"
                  class="py-4 pr-4"
                >
                  <!-- 点击标签时触发单行选择/取消选择操作 -->
                  <label @click.stop="toggleRowSelect(i)">
                    <!-- 多选框组件，双向绑定单行选择状态 -->
                    <UCheckbox v-model="item.isChecked" />
                  </label>
                </td>
                <!-- 循环渲染表格数据列 -->
                <template
                  v-for="(cell, i) in tableHeader"
                  :key="i"
                >
                  <!-- 表格数据列，设置了文本对齐方式和样式 -->
                  <td
                    :class="[
                      cell.align == 'left' && 'text-start',
                      cell.align == 'center' && 'text-center',
                      cell.align == 'right' && 'text-end',
                      cell.key == 'actions' && 'text-end',
                      cell.columnClass && cell.columnClass.split(' '),
                      'py-4',
                      i === 0 && 'pl-4',
                      i === tableHeader.length - 1 && 'pr-4',
                    ]"
                    :style="
                      cell.offset
                        ? {
                            [cell.align === 'right'
                              ? 'padding-right'
                              : 'padding-left']: `${cell.offset}`,
                          }
                        : {}
                    "
                  >
                    <!-- 插槽，用于自定义表格单元格内容 -->
                    <slot
                      :name="`cell-${cell.key}`"
                      :row="item"
                    >
                    </slot>
                  </td>
                </template>
                <!-- 如果开启了展开按钮，则显示展开按钮列 -->
                <td
                  v-if="showExpandBtn"
                  class="cell-btn w-40px"
                >
                  <!-- 展开按钮，点击时触发展开/收起操作 -->
                  <button
                    class="btn btn-icon toggle-btn btn-bg-light btn-active-color-theme btn-sm"
                    :class="{ active: item.isExpand }"
                    @click.stop="onToggleBtnClick(i)"
                  >
                    Expand
                  </button>
                </td>
              </tr>
              <!-- 如果有小计行数据，则循环渲染小计行 -->
              <template v-if="totalArray.length > 0">
                <!-- 循环渲染小计行 -->
                <template
                  v-for="(t, k) in totalArray"
                  :key="k"
                >
                  <!-- 小计行，根据条件判断是否显示 -->
                  <tr
                    v-if="
                      t.string.length === colspanNumber &&
                      t.string.length === t.span.length &&
                      t.index === i
                    "
                  >
                    <!-- 如果开启了多选框且小计行对应列有跨度，则显示该列 -->
                    <td
                      v-if="selection && t.span[0] !== 0"
                      class="text-start"
                      :colspan="t.span[0]"
                      v-html="t.string[0]"
                    ></td>
                    <!-- 循环渲染小计行数据列 -->
                    <template
                      v-for="(cell, i) in tableHeader"
                      :key="i"
                    >
                      <!-- 小计行数据列，根据条件判断是否显示 -->
                      <td
                        v-if="t.span[i + 1] !== 0"
                        :class="[
                          cell.align == 'left' && 'text-start',
                          cell.align == 'center' && 'text-center',
                          cell.align == 'right' && 'text-end',
                          cell.key == 'actions' && 'text-end',
                        ]"
                        :colspan="t.span[i + 1]"
                        v-html="t.string[i + 1]"
                      ></td>
                    </template>
                    <!-- 如果开启了展开按钮且小计行对应列有跨度，则显示该列 -->
                    <td
                      v-if="showExpandBtn && t.span[t.span.length - 1] !== 0"
                      :colspan="t.span[t.span.length - 1]"
                      v-html="t.string[t.string.length - 1]"
                    ></td>
                  </tr>
                </template>
              </template>
              <!-- 如果展开内容不在表格内且当前行处于展开状态，则显示展开内容插槽 -->
              <template v-if="!expandInTable && item.isExpand">
                <!-- 展开内容插槽 -->
                <slot
                  name="cell-sub"
                  :row="item"
                ></slot>
              </template>
              <!-- 如果展开内容在表格内且当前行处于展开状态，则显示展开内容插槽 -->
              <tr v-if="expandInTable && item.isExpand">
                <!-- 展开内容单元格，跨列显示 -->
                <td :colspan="colspanNumber">
                  <!-- 展开内容插槽 -->
                  <slot
                    name="cell-sub"
                    :row="item"
                  ></slot>
                </td>
              </tr>
            </template>
          </template>
          <!-- 如果没有数据，则显示空数据提示 -->
          <template v-else>
            <!-- 空数据行 -->
            <tr>
              <!-- 空数据单元格，跨列显示 -->
              <td
                :colspan="colspanNumber"
                class="text-center py-60"
              >
                <!-- 空数据提示文本 -->
                <p class="h-8">
                  <!-- 如果没有加载中状态，则显示空数据提示 -->
                  <span v-if="!loading">{{ emptyTableText }}</span>
                </p>
              </td>
            </tr>
          </template>
        </tbody>
        <!--end::Table body-->
      </table>
    </div>

    <!-- 分页和信息区域 -->
    <div class="mt-8">
      <!-- 分页信息和每页显示数量选择区域 -->
      <div class="flex flex-col portrait:items-center">
        <!-- 如果开启了每页显示数量选择菜单，则显示选择菜单 -->
        <div
          v-if="enableItemsPerPageDropdown"
          class="w-36 portrait:w-full"
        >
          <!-- 选择菜单组件，双向绑定每页显示数量 -->
          <USelectMenu
            v-model="pagination.rowsPerPage"
            :options="['10', '30', '50', '100', '200']"
            @update:model-value="setItemsPerPage"
          />
        </div>
        <!-- 如果开启了每页显示数量选择菜单，则显示分页信息 -->
        <p
          v-if="enableItemsPerPageDropdown"
          class="text-sm text-text-3 mt-2"
        >
          <!-- 显示当前页数据范围和总数据数量 -->
          {{
            translate("common.records", [
              rowsStartNumber,
              rowsEndNumber,
              pagination.total,
            ])
          }}
        </p>
      </div>
      <!-- 如果开启了当前页按钮，则显示分页按钮 -->
      <div
        v-if="enableCurrentPageButtons"
        class="flex items-center justify-center landscape:justify-end portrait:mt-12"
      >
        <UPagination
          v-model="pagination.page"
          :page-count="pagination.rowsPerPage"
          :total="pagination.total"
          @update:model-value="currentPageChange"
        />
        <!-- 显示分页信息 -->
        <!-- {{ pagination }} -->
      </div>
    </div>

    <!-- 如果处于加载中状态，则显示加载层 -->
    <div
      v-if="loading"
      class="absolute top-0 left-0 w-full h-full"
    >
      <!-- 加载图标 -->
      <div
        v-loading="loading"
        class="w-full h-full"
      >
        <!-- 屏幕阅读器可见的加载提示 -->
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import arraySort from "array-sort";
  import { useI18n } from "vue-i18n";
  import _ from "lodash";
  import { ref, computed, watch, onMounted, defineProps } from "vue";

  /**
   * 分页信息接口
   * @interface IPagination
   * @property {number} page - 当前页码
   * @property {number} total - 数据总数
   * @property {number} rowsPerPage - 每页显示数量
   */
  interface IPagination {
    page: number;
    total: number;
    rowsPerPage: number;
  }

  /**
   * 表格头部配置接口
   * @interface IHeaderConfiguration
   * @property {string} [name] - 列标题名称
   * @property {string} key - 列键名
   * @property {string} [sortingField] - 排序字段
   * @property {boolean} [sortable] - 是否可排序
   * @property {string} [align] - 文本对齐方式
   * @property {string} [offset] - 列偏移量
   * @property {string} [columnClass] - 列样式类名
   */
  interface IHeaderConfiguration {
    name?: string;
    key: string;
    sortingField?: string; // 提供字段在接口中的ID用于排序
    sortable?: boolean; // 字段允许被排序
    align?: string;
    offset?: string;
    columnClass?: string;
  }

  /**
   * 小计行数据项接口
   * @interface TotalArrayItem
   * @property {number} index - 关联的行索引
   * @property {string[]} string - 小计行文本内容数组
   * @property {number[]} span - 小计行列跨度数组
   */
  interface TotalArrayItem {
    index: number;
    string: string[];
    span: number[];
  }

  /**
   * 排序计数器项接口
   * @interface SortCounter
   * @property {string} columnName - 列名
   * @property {number} counter - 排序计数器
   */
  interface SortCounter {
    columnName: string;
    counter: number;
  }

  // 定义组件属性
  const props = defineProps({
    // 列标题
    tableHeader: {
      type: Array as () => Array<IHeaderConfiguration>,
      required: true,
    },
    // 表数据
    tableData: { type: Array, default: [], required: false },
    // 空数据提示
    emptyTableText: { type: String, default: "No data found" },
    // 加载中
    loading: { type: Boolean, default: false },
    // 开启首列多选框
    selection: { type: Boolean, default: false },
    // 开启展开按钮 （展开内容插槽位置：sub）
    showExpandBtn: { type: Boolean, default: false },
    // 展开所有数据
    expandAll: { type: Boolean, default: false },
    // 展开表在主表的tr内（若为false将不符合HTML规范，仅用于特殊视觉效果或临时占位符）
    expandInTable: { type: Boolean, default: true },
    // 绑定到index的小计行
    totalArray: {
      type: Array as () => TotalArrayItem[],
      default: () => {
        return [];
      },
    },
    // 开启第几页调整按钮
    enableCurrentPageButtons: { type: Boolean, default: false },
    // 开启分页大小调整菜单
    enableItemsPerPageDropdown: { type: Boolean, default: false },
    // 第几页
    currentPage: { type: Number, default: 0 },
    // 分页大小
    rowsPerPage: { type: Number, default: 0 },
    // 数据总数
    total: { type: Number, default: 0 },
    // 被排序字段
    sortLabel: { type: String, default: "" },
    // 正序/倒序
    sortOrder: { type: String, default: "" },
    // 是否为远程（后端）控制分页、排序
    remote: { type: Boolean, default: false },
  });

  // 定义组件触发的事件
  const emit = defineEmits([
    "current-change",
    "sort-change",
    "items-per-page-change",
    "select-change",
  ]);

  /**
   * 触发事件过滤参数，删掉内部临时属性，并传递给父组件
   * @param {('current-change' | 'sort-change' | 'items-per-page-change' | 'select-change')} emitFlag - 事件标志
   * @param {any} emitParms - 事件参数
   */
  const emitFilter = (
    emitFlag:
      | "current-change"
      | "sort-change"
      | "items-per-page-change"
      | "select-change",
    emitParms: any,
  ) => {
    if (emitFlag == "select-change") {
      const tempArray = _.cloneDeep(emitParms);
      tempArray.forEach((item: any) => {
        delete item.isChecked;
        delete item.isExpand;
      });
      emit(emitFlag, tempArray);
    } else {
      emit(emitFlag, emitParms);
    }
  };

  // 原始数据引用
  const originData = ref(_.cloneDeep(props.tableData));
  // 当前排序状态引用 （排序字段+排序顺序）
  const currentSort = ref<string>("");
  // 排序顺序引用
  const sortOrder = ref(props.sortOrder);
  // 排序字段引用
  const sortLabel = ref(props.sortLabel);
  // 分页信息引用
  const pagination = ref<IPagination>({
    page: 0,
    total: 0,
    rowsPerPage: 0,
  });
  // 表格行数据引用
  const rowsData = ref<any>([]);
  // 是否全部展开引用
  const isAllExpand = ref<boolean>(props.expandAll);
  // 是否全部选中引用
  const isAllChecked = ref<boolean>(false);
  // 选中行数据引用
  const selectedRows = ref<any>([]);
  // 排序计数器数组
  const sortCounterFlag = [] as SortCounter[];

  // 国际化工具
  const { t, te } = useI18n();

  // 计算当前页数据起始编号
  const rowsStartNumber = computed(() => {
    return pagination.value.total == 0
      ? 0
      : (pagination.value.page - 1) * pagination.value.rowsPerPage + 1;
  });

  // 计算当前页数据结束编号
  const rowsEndNumber = computed(() => {
    return pagination.value.page * pagination.value.rowsPerPage >=
      pagination.value.total
      ? pagination.value.total
      : pagination.value.page * pagination.value.rowsPerPage;
  });

  // 计算表格列总数
  const colspanNumber = computed(() => {
    let total = props.tableHeader.length;
    if (props.selection) {
      total += 1;
    }
    if (props.showExpandBtn) {
      total += 1;
    }
    return total;
  });

  /**
   * 初始化选择状态
   */
  const selectInit = () => {
    isAllChecked.value = false;
    rowsData.value.forEach((item: any) => {
      item.isChecked = false;
    });
    selectedRows.value = [];
    emitFilter("select-change", selectedRows.value);
  };

  /**
   * 初始化展开状态
   * @param {boolean} flag - 展开标志
   */
  const expandInit = (flag: boolean) => {
    rowsData.value.forEach((item: any) => {
      item.isExpand = flag;
    });
  };

  /**
   * 初始化排序状态
   */
  const sortInit = () => {
    sortOrder.value = props.sortOrder;
    sortLabel.value = props.sortLabel;
    originData.value.splice(0, originData.value.length, ...props.tableData);
  };

  /**
   * 初始化分页状态
   */
  const paginationInit = (data: Array<any>) => {
    // 只在第一次初始化时设置分页信息
    if (
      pagination.value.page === 0 &&
      pagination.value.total === 0 &&
      pagination.value.rowsPerPage === 0
    ) {
      if (props.currentPage === 0) {
        pagination.value.page = 1;
      } else {
        pagination.value.page = props.currentPage;
      }
      if (props.total === 0) {
        pagination.value.total = data.length;
      } else {
        pagination.value.total = props.total;
      }
      if (props.rowsPerPage === 0) {
        if (props.enableItemsPerPageDropdown) {
          pagination.value.rowsPerPage = 10;
        } else {
          pagination.value.rowsPerPage = data.length;
        }
      } else {
        pagination.value.rowsPerPage = props.rowsPerPage;
      }
    }
  };

  /**
   * 格式化表格行数据
   * @param {Array<any>} data - 原始数据
   */
  const rowsDataFormat = (data: Array<any>) => {
    let tempArray: any = _.cloneDeep(data);
    tempArray.forEach((item: Object) => {
      return Object.assign(item, { isChecked: false, isExpand: false });
    });
    rowsData.value.splice(0, rowsData.value.length, ...tempArray);

    paginationInit(tempArray);

    let tempData = rowsData.value.slice();
    const startIndex =
      pagination.value.page * pagination.value.rowsPerPage -
      pagination.value.rowsPerPage;
    const length = pagination.value.rowsPerPage;

    if (pagination.value.total >= startIndex) {
      rowsData.value.splice(
        0,
        rowsData.value.length,
        ...tempData.splice(startIndex, length),
      );
    } else {
      pagination.value.page = Math.ceil(
        pagination.value.total / pagination.value.rowsPerPage,
      );
      rowsDataFormat(originData.value);
    }

    selectInit();
    expandInit(isAllExpand.value);
  };

  /**
   * 当前页改变事件处理函数
   */
  const currentPageChange = () => {
    emit("current-change", pagination.value.page);
    // 本地分页
    if (!props.remote) {
      rowsDataFormat(originData.value);
    }
  };

  /**
   * 设置每页显示数量事件处理函数
   */
  const setItemsPerPage = () => {
    emit("items-per-page-change", pagination.value.rowsPerPage);
    // 本地分页
    if (!props.remote) {
      rowsDataFormat(originData.value);
    }
  };

  /**
   * 排序计数器
   * @param {string} columnName - 列名
   */
  const sortCounter = (columnName: string) => {
    if (sortCounterFlag.some((item) => item.columnName === columnName)) {
      sortCounterFlag.forEach((item) => {
        if (item.columnName === columnName) {
          item.counter = item.counter + 1;
        }
      });
    } else {
      sortCounterFlag.splice(0, sortCounterFlag.length, {
        columnName: columnName,
        counter: 1,
      });
    }
  };

  /**
   * 判断排序计数器是否达到3次
   * @param {string} columnName - 列名
   * @returns {boolean} - 是否达到3次
   */
  const onSortCounterThree = (columnName: string) => {
    let resetFlag = false;
    sortCounterFlag.forEach((item) => {
      if (item.columnName === columnName) {
        if (item.counter === 3) {
          sortCounterFlag.splice(0, sortCounterFlag.length);
          resetFlag = true;
        }
      }
    });
    return resetFlag;
  };

  /**
   * 排序函数
   * @param {string} columnName - 列名
   * @param {boolean | undefined} sortable - 是否可排序
   */
  const sort = (columnName: string, sortable: boolean | undefined) => {
    if (sortable === false) {
      return;
    }
    sortCounter(columnName);
    const resetFlag = onSortCounterThree(columnName);
    if (resetFlag) {
      sortInit();
      emit("sort-change", {
        columnName: props.sortLabel,
        order: props.sortOrder,
      });
    } else {
      let thisDirection = "";
      sortCounterFlag.forEach((item) => {
        if (item.columnName === columnName) {
          if (item.counter === 1) {
            thisDirection = "asc"; //第一次正序
          }
          if (item.counter === 2) {
            thisDirection = "desc"; //第二次倒序
          }
        }
      });
      sortOrder.value = thisDirection;
      sortLabel.value = columnName;
      emit("sort-change", {
        columnName: columnName,
        order: thisDirection,
      });
      // 本地排序
      if (!props.remote) {
        // console.log("sort", columnName, thisDirection);
        if (thisDirection === "asc") {
          const tempArray = _.cloneDeep(originData.value);
          const sortArray = arraySort(tempArray, columnName, {
            reverse: true,
          });
          // console.log("sortArray", sortArray);
          originData.value.splice(0, originData.value.length, ...sortArray);
        }
        if (thisDirection === "desc") {
          const tempArray = _.cloneDeep(originData.value);
          const sortArray = arraySort(tempArray, columnName, {
            reverse: false,
          });
          // console.log("sortArray", sortArray);
          originData.value.splice(0, originData.value.length, ...sortArray);
        }
      }
    }
    currentSort.value = columnName + sortOrder.value;
  };

  /**
   * 全量展开/收起按钮点击事件处理函数
   */
  const onToggleAllClick = () => {
    isAllExpand.value = !isAllExpand.value;
    expandInit(isAllExpand.value);
  };

  /**
   * 单行展开/收起按钮点击事件处理函数
   * @param {number} i - 行索引
   */
  const onToggleBtnClick = (i: number) => {
    rowsData.value[i].isExpand = !rowsData.value[i].isExpand;
  };

  /**
   * 全选/反选按钮点击事件处理函数
   */
  const toggleAllSelect = () => {
    isAllChecked.value = !isAllChecked.value;
    rowsData.value.forEach((item: any) => {
      item.isChecked = isAllChecked.value;
    });
    getSelectedRows();
    emitFilter("select-change", selectedRows.value);
  };

  /**
   * 单行选择/取消选择按钮点击事件处理函数
   * @param {number} i - 行索引
   */
  const toggleRowSelect = (i: number) => {
    rowsData.value[i].isChecked = !rowsData.value[i].isChecked;
    getSelectedRows();
    emitFilter("select-change", selectedRows.value);
  };

  /**
   * 获取选中行数据
   * @returns {any[]} - 选中行数据数组
   */
  const getSelectedRows = () => {
    let rows: any = [];
    rowsData.value.forEach((item: any) => {
      if (item.isChecked) {
        rows.push(item);
      }
    });
    selectedRows.value.splice(0, selectedRows.value.length, ...rows);
    isAllChecked.value = rowsData.value.length == selectedRows.value.length;
    return selectedRows.value;
  };

  /**
   * 翻译函数
   * @param {string} text - 待翻译文本
   * @param {any} [params] - 翻译参数
   * @returns {string} - 翻译结果
   */
  const translate = (text: string, params?: any) => {
    if (te(text)) {
      return t(text, params);
    } else {
      return text;
    }
  };

  // 监听表格数据变化
  watch(
    () => props.tableData,
    (newVal) => {
      // console.log('watch data', newVal);
      originData.value = _.cloneDeep(newVal);
      rowsDataFormat(newVal);
      pagination.value.total = props.tableData.length;
    },
    { immediate: true, deep: true },
  );

  // 监听原始数据变化
  watch(
    () => originData.value,
    (newVal) => {
      rowsDataFormat(newVal);
    },
    { immediate: true, deep: true },
  );

  // 监听当前页变化
  watch(
    () => props.currentPage,
    (newVal) => {
      if (props.remote) {
        pagination.value.page = newVal;
      }
    },
  );

  // 监听每页显示数量变化
  watch(
    () => props.rowsPerPage,
    (newVal) => {
      if (props.remote) {
        pagination.value.rowsPerPage = newVal;
      }
    },
  );

  // 监听数据总数变化
  watch(
    () => props.total,
    (newVal) => {
      if (props.remote) {
        pagination.value.total = newVal;
      }
    },
  );

  // 监听是否全部展开变化
  watch(
    () => props.expandAll,
    (newVal) => {
      isAllExpand.value = newVal;
      expandInit(newVal);
    },
  );

  // 监听排序字段变化
  watch(
    () => props.sortLabel,
    (newVal) => {
      if (props.remote) {
        sortLabel.value = newVal;
        currentSort.value = newVal + sortOrder.value;
      }
    },
  );

  // 监听排序顺序变化
  watch(
    () => props.sortOrder,
    (newVal) => {
      if (props.remote) {
        sortOrder.value = newVal;
        currentSort.value = sortLabel.value + newVal;
      }
    },
  );

  // 组件挂载时初始化操作
  onMounted(() => {
    currentSort.value = sortLabel.value + sortOrder.value;
  });
</script>
<style scoped>
  .visually-hidden {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }

  /* 可排序列样式 */
  .sorting {
    &::after {
      content: "▼";
      display: inline-block;
      transform: scale(0.6);
      transition: opacity 0.3s ease;
      opacity: 0;
    }
    /* 降序排序样式 */
    &.sorting_desc {
      &::after {
        transform: rotate(0deg) scale(0.6);
        opacity: 1;
      }
    }
    /* 升序排序样式 */
    &.sorting_asc {
      &::after {
        transform: rotate(-180deg) scale(0.6);
        opacity: 1;
      }
    }
  }
</style>
