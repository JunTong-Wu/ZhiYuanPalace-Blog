<template>
  <div>
    <div>
      <table class="table w-full mb-4">
        <!--begin::Table head-->
        <thead>
          <!--begin::Table row-->
          <tr
            class="text-text-2 font-bold uppercase border-b border-dashed border-borderColor"
          >
            <th
              v-if="selection"
              class="py-4"
            >
              <label @click.stop="toggleAllSelect">
                <UCheckbox v-model="isAllChecked" />
              </label>
            </th>
            <template
              v-for="(cell, i) in tableHeader"
              :key="i"
            >
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
                {{ cell.name }}
              </th>
            </template>
          </tr>
          <!--end::Table row-->
        </thead>
        <!--end::Table head-->
        <!--begin::Table body-->
        <tbody class="font-bold">
          <template v-if="rowsData.length">
            <template
              v-for="(item, i) in rowsData"
              :key="i"
            >
              <tr class="border-b border-dashed border-borderColor">
                <td
                  v-if="selection"
                  class="text-start py-4"
                >
                  <label @click.stop="toggleRowSelect(i)">
                    <UCheckbox v-model="item.isChecked" />
                  </label>
                </td>
                <template
                  v-for="(cell, i) in tableHeader"
                  :key="i"
                >
                  <td
                    :class="[
                      item.sortable !== false && 'sorting',
                      cell.align == 'left' && 'text-start',
                      cell.align == 'center' && 'text-center',
                      cell.align == 'right' && 'text-end',
                      cell.key == 'actions' && 'text-end',
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
                    <slot
                      :name="`cell-${cell.key}`"
                      :row="item"
                    >
                    </slot>
                  </td>
                </template>
                <td
                  v-if="showExpandBtn"
                  class="cell-btn w-40px"
                >
                  <button
                    class="btn btn-icon toggle-btn btn-bg-light btn-active-color-theme btn-sm"
                    :class="{ active: item.isExpand }"
                    @click.stop="onToggleBtnClick(i)"
                  >
                    Expand
                  </button>
                </td>
              </tr>
              <template v-if="totalArray.length > 0">
                <template
                  v-for="(t, k) in totalArray"
                  :key="k"
                >
                  <tr
                    v-if="
                      t.string.length === colspanNumber &&
                      t.string.length === t.span.length &&
                      t.index === i
                    "
                  >
                    <td
                      v-if="selection && t.span[0] !== 0"
                      class="text-start"
                      :colspan="t.span[0]"
                      v-html="t.string[0]"
                    ></td>
                    <template
                      v-for="(cell, i) in tableHeader"
                      :key="i"
                    >
                      <td
                        v-if="t.span[i + 1] !== 0"
                        :class="[
                          item.sortable !== false && 'sorting',
                          cell.align == 'left' && 'text-start',
                          cell.align == 'center' && 'text-center',
                          cell.align == 'right' && 'text-end',
                          cell.key == 'actions' && 'text-end',
                        ]"
                        :colspan="t.span[i + 1]"
                        v-html="t.string[i + 1]"
                      ></td>
                    </template>
                    <td
                      v-if="showExpandBtn && t.span[t.span.length - 1] !== 0"
                      :colspan="t.span[t.span.length - 1]"
                      v-html="t.string[t.string.length - 1]"
                    ></td>
                  </tr>
                </template>
              </template>
              <template v-if="!expandInTable && item.isExpand">
                <slot
                  name="cell-sub"
                  :row="item"
                ></slot>
              </template>
              <tr v-if="expandInTable && item.isExpand">
                <td :colspan="colspanNumber">
                  <slot
                    name="cell-sub"
                    :row="item"
                  ></slot>
                </td>
              </tr>
            </template>
          </template>
          <template v-else>
            <tr>
              <td
                :colspan="colspanNumber"
                class="text-center py-60"
              >
                <p class="h-8">
                  <span v-if="!loading">{{ emptyTableText }}</span>
                </p>
              </td>
            </tr>
          </template>
        </tbody>
        <!--end::Table body-->
      </table>
    </div>

    <div class="mt-8">
      <div>
        <div
          v-if="enableItemsPerPageDropdown"
          class="w-36"
        >
          <USelectMenu
            v-model="pagination.rowsPerPage"
            :options="[10, 30, 50, 100, 200]"
            @update:model-value="setItemsPerPage"
          />
        </div>
        <p class="text-sm text-text-3 mt-2">
          {{
            translate('common.records', [
              rowsStartNumber,
              rowsEndNumber,
              pagination.total,
            ])
          }}
        </p>
      </div>
      <div class="flex items-center justify-center landscape:justify-end">
        <UPagination
          v-model="pagination.page"
          :page-count="pagination.rowsPerPage"
          :total="pagination.total"
          @update:model-value="currentPageChange"
        />
      </div>
    </div>

    <div
      v-if="loading"
      class="overlay-layer card-rounded bg-dark bg-opacity-5"
    >
      <div
        class="spinner-border text-theme"
        role="status"
      >
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import arraySort from 'array-sort';
  import { useI18n } from 'vue-i18n';
  import _ from 'lodash';

  interface IPagination {
    page: number;
    total: number;
    rowsPerPage: number;
  }

  interface IHeaderConfiguration {
    name?: string;
    key: string;
    sortingField?: string; // 提供字段在接口中的ID用于排序
    sortable?: boolean; // 字段允许被排序
    align?: string;
    offset?: string;
  }

  interface TotalArrayItem {
    index: number;
    string: string[];
    span: number[];
  }

  interface SortCounter {
    columnName: string;
    counter: number;
  }

  export default defineComponent({
    name: 'zy-datatable',
    emit: [
      'current-change',
      'sort-change',
      'items-per-page-change',
      'select-change',
    ],
    props: {
      // 列标题
      tableHeader: {
        type: Array as () => Array<IHeaderConfiguration>,
        required: true,
      },
      // 表数据
      tableData: { type: Array, required: true },
      // 空数据提示
      emptyTableText: { type: String, default: 'No data found' },
      // 加载中
      loading: { type: Boolean, default: false },

      // 第几页
      currentPage: { type: Number, default: 1 },
      // 分页大小
      rowsPerPage: { type: Number, default: 10 },
      // 数据总数
      total: { type: Number, default: 0 },
      // 开启分页大小调整菜单
      enableItemsPerPageDropdown: { type: Boolean, default: true },

      // 被排序字段
      sortLabel: { type: String, default: '' },
      // 正序/倒序
      sortOrder: { type: String, default: '' },

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

      // 是否为远程（后端）控制分页、排序
      remote: { type: Boolean, default: false },
    },
    components: {},
    setup(props, { emit }) {
      const originData = ref(_.cloneDeep(props.tableData));
      const currentSort = ref<string>('');
      const sortOrder = ref(props.sortOrder);
      const sortLabel = ref(props.sortLabel);
      const pagination = ref<IPagination>({
        page: 1,
        total: props.total,
        rowsPerPage: props.rowsPerPage,
      });
      const rowsData = ref<any>([]);
      const isAllExpand = ref<boolean>(props.expandAll);
      const isAllChecked = ref<boolean>(false);
      const selectedRows = ref<any>([]);
      const sortCounterFlag = [] as SortCounter[];

      const { t, te } = useI18n();

      const rowsStartNumber = computed(() => {
        return pagination.value.total == 0
          ? 0
          : (pagination.value.page - 1) * pagination.value.rowsPerPage + 1;
      });

      const rowsEndNumber = computed(() => {
        return pagination.value.page * pagination.value.rowsPerPage >=
          pagination.value.total
          ? pagination.value.total
          : pagination.value.page * pagination.value.rowsPerPage;
      });

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

      const selectInit = () => {
        isAllChecked.value = false;
        rowsData.value.forEach((item: any) => {
          item.isChecked = false;
        });
        selectedRows.value = [];
        emit('select-change', selectedRows.value);
      };

      const expandInit = (flag: boolean) => {
        rowsData.value.forEach((item: any) => {
          item.isExpand = flag;
        });
      };

      const sortInit = () => {
        sortOrder.value = props.sortOrder;
        sortLabel.value = props.sortLabel;
        originData.value.splice(0, originData.value.length, ...props.tableData);
      };

      const rowsDataFormat = (data: Array<any>) => {
        let tempArray: any = _.cloneDeep(data);
        tempArray.forEach((item: Object) => {
          return Object.assign(item, { isChecked: false, isExpand: false });
        });
        rowsData.value.splice(0, rowsData.value.length, ...tempArray);

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

      const currentPageChange = () => {
        emit('current-change', pagination.value.page);
        // 本地分页
        if (!props.remote) {
          rowsDataFormat(originData.value);
        }
      };

      const setItemsPerPage = () => {
        emit('items-per-page-change', pagination.value.rowsPerPage);
        // 本地分页
        if (!props.remote) {
          rowsDataFormat(originData.value);
        }
      };

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

      const sort = (columnName: string, sortable: boolean | undefined) => {
        if (sortable === false) {
          return;
        }
        if (props.remote) {
          emit('sort-change', { columnName: columnName });
        } else {
          sortCounter(columnName);
          const resetFlag = onSortCounterThree(columnName);
          if (resetFlag) {
            sortInit();
            emit('sort-change', {
              columnName: props.sortLabel,
              order: props.sortOrder,
            });
          } else {
            let thisDirection = '';
            sortCounterFlag.forEach((item) => {
              if (item.columnName === columnName) {
                if (item.counter === 1) {
                  thisDirection = 'asc'; //第一次正序
                }
                if (item.counter === 2) {
                  thisDirection = 'desc'; //第二次倒序
                }
              }
            });
            sortOrder.value = thisDirection;
            sortLabel.value = columnName;
            emit('sort-change', {
              columnName: columnName,
              order: thisDirection,
            });
            // 本地排序
            if (!props.remote) {
              if (thisDirection === 'asc') {
                arraySort(originData.value, columnName, { reverse: true });
              }
              if (thisDirection === 'desc') {
                arraySort(originData.value, columnName, { reverse: false });
              }
            }
          }
        }
        currentSort.value = columnName + sortOrder.value;
      };

      const onToggleAllClick = () => {
        isAllExpand.value = !isAllExpand.value;
        expandInit(isAllExpand.value);
      };

      const onToggleBtnClick = (i: number) => {
        rowsData.value[i].isExpand = !rowsData.value[i].isExpand;
      };

      const toggleAllSelect = () => {
        isAllChecked.value = !isAllChecked.value;
        rowsData.value.forEach((item: any) => {
          item.isChecked = isAllChecked.value;
        });
        getSelectedRows();
        emit('select-change', selectedRows.value);
      };

      const toggleRowSelect = (i: number) => {
        rowsData.value[i].isChecked = !rowsData.value[i].isChecked;
        getSelectedRows();
        emit('select-change', selectedRows.value);
      };

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

      const translate = (text: string, params?: any) => {
        if (te(text)) {
          return t(text, params);
        } else {
          return text;
        }
      };

      watch(
        props.tableData,
        (newVal) => {
          // console.log('watch data', newVal);
          originData.value = _.cloneDeep(newVal);
          rowsDataFormat(newVal);
          pagination.value.total = props.tableData.length;
        },
        { immediate: true, deep: true },
      );

      watch(
        () => props.currentPage,
        (newVal) => {
          if (props.remote) {
            pagination.value.page = newVal;
          }
        },
      );

      watch(
        () => props.rowsPerPage,
        (newVal) => {
          if (props.remote) {
            pagination.value.rowsPerPage = newVal;
          }
        },
      );

      watch(
        () => props.total,
        (newVal) => {
          if (props.remote) {
            pagination.value.total = newVal;
          }
        },
      );

      watch(
        () => props.expandAll,
        (newVal) => {
          isAllExpand.value = newVal;
          expandInit(newVal);
        },
      );

      watch(
        () => props.sortLabel,
        (newVal) => {
          if (props.remote) {
            sortLabel.value = newVal;
            currentSort.value = newVal + sortOrder.value;
          }
        },
      );

      watch(
        () => props.sortOrder,
        (newVal) => {
          if (props.remote) {
            sortOrder.value = newVal;
            currentSort.value = sortLabel.value + newVal;
          }
        },
      );

      onMounted(() => {
        currentSort.value = sortLabel.value + sortOrder.value;
        if (props.remote) {
          pagination.value.total = props.total;
          pagination.value.rowsPerPage = props.rowsPerPage;
        }
      });

      return {
        pagination,
        currentPageChange,
        rowsData,
        sort,
        currentSort,
        setItemsPerPage,
        rowsStartNumber,
        rowsEndNumber,
        colspanNumber,
        translate,
        onToggleAllClick,
        onToggleBtnClick,
        isAllExpand,
        isAllChecked,
        toggleAllSelect,
        toggleRowSelect,
        selectInit,
        getSelectedRows,
      };
    },
  });
</script>
