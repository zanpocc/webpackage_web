<template>
  <div>
    <el-dialog
      title="请先设置数据源"
      :visible.sync="dataSourceDialogVisible"
      width="25%"
      :before-close="handleClose"
    >
      <el-form ref="form" :model="form" label-width="100px">
        <el-form-item label="jdbc连接串">
          <el-input
            v-model="form.url"
            placeholder="jdbc:mysql://localhost:3306"
          ></el-input>
        </el-form-item>
        <el-form-item label="账户">
          <el-input v-model="form.user" placeholder="root"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.password" placeholder="123456"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dataSourceDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addDataSource">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="选择生成目录"
      :visible.sync="saveDialogVisible"
      width="25%"
      :before-close="handleClose"
    >
      <div>
        <el-tree
          ref="pathTree"
          :props="defaultProps"
          :data="pathTree"
          node-key="id"
          accordion
          @node-click="handlePathTreeClick"
        >
        </el-tree>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="saveDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="setSavePath">确 定</el-button>
      </span>
    </el-dialog>

    <div>
      <el-form ref="form" :model="form" label-width="130px" style="width: 40%">
        <el-form-item label="生成目录" required>
          <el-input
            placeholder="请输入内容"
            v-model="form.savePath"
            class="input-with-select"
          >
            <el-button
              slot="append"
              icon="el-icon-folder"
              type="success"
              @click="saveBtnClick"
            ></el-button>
          </el-input>
        </el-form-item>
        <el-form-item label="Entity命名" style="width: 60%" required>
          <el-input
            placeholder="请输入内容"
            v-model="form.entityName"
            class="input-with-select"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="Entity包名" style="width: 60%" required>
          <el-input
            placeholder="请输入内容"
            v-model="form.entityPackageName"
            class="input-with-select"
          >
          </el-input>
        </el-form-item>

        <el-form-item label="Dao命名" style="width: 60%" required>
          <el-input
            placeholder="请输入内容"
            v-model="form.daoName"
            class="input-with-select"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="Dao包名" style="width: 60%" required>
          <el-input
            placeholder="请输入内容"
            v-model="form.daoPackageName"
            class="input-with-select"
          >
          </el-input>
        </el-form-item>

        <el-form-item label="Mapper命名" style="width: 60%" required>
          <el-input
            placeholder="请输入内容"
            v-model="form.mapperName"
            class="input-with-select"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="Mapper目录" style="width: 60%" required>
          <el-input
            placeholder="请输入内容"
            v-model="form.mapperPackageName"
            class="input-with-select"
          >
          </el-input>
        </el-form-item>

        <el-form-item label="schema" required>
          <el-select
            v-model="form.schema"
            clearable
            placeholder="请选择"
            @visible-change="getSchemas"
          >
            <el-option
              v-for="item in schemas"
              :key="item.key"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSubmit">生成</el-button>
          <el-button @click="clearInput">清空</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  beforeCreate() {
    var that = this;
    var api = "/database/datasource/list/";
    this.$http
      .get(api)
      .then((res) => {
        var body = res.body;
        if (!body.success) {
          this.$message.error(body.message);
        }
        if (body.data.length < 1) {
          // 没数据源，弹框让输入
          this._data.dataSourceDialogVisible = true;
        }
      })
      .catch((e) => {
        this.$message.error("服务调用异常");
      });
  },
  data() {
    return {
      dataSourceDialogVisible: false,
      saveDialogVisible: false,
      currentTreeNodePath: "",
      schemas: [{ value: "2", label: "2", key: "2" }],
      form: {
        savePath: "/Volumes/Mac/TestCode",
        schema: "myblog",
        entityName: "${firstUppercaseName}.java",
        daoName: "${firstUppercaseName}Dao.java",
        mapperName: "${firstUppercaseName}Mapper.xml",
        entityPackageName: "com.zanpo.it.entity",
        daoPackageName: "com.zanpo.it.dao",
        mapperPackageName: "com.zanpo.it.mapper",
      },
      pathTree: [
        {
          id: 1,
          label: "/",
        },
      ],
      defaultProps: {
        children: "children",
        label: "label",
      },
    };
  },
  methods: {
    getSchemas(visible) {
      if(!visible){
        return
      }
      console.log(111);
      var api = "/database/schema/list";
      this.$http
        .get(api)
        .then((res) => {
          console.log(222);
          // 更新下拉框数据
          var body = res.body;
          if (body.success === true) {
            var schemas = []
            
            var data = body.data
            for(var i = 0;i < data.length;i++){
              Array.push(schemas,{"key":data[i],"label":data[i],"value":data[i]})
            }
            this._data.schemas = schemas
          } else {
            this.$message.error("获取Schemas失败");
          }
        })
        .catch((e) => {
          this.$message.error("服务调用异常");
        });
    },
    onSubmit() {
      var api = "/database/codeGen/";
      this.$http
        .post(api, this._data.form)
        .then((res) => {
          // 更新选中节点下的显示数据
          var body = res.body;
          if (body.success === true) {
            this.$message.success("代码生成成功");
          } else {
            this.$message.error("代码生成失败");
          }
        })
        .catch((e) => {
          this.$message.error("服务调用异常");
        });
    },
    clearInput() {
      this._data.form.savePath = "";
      this._data.form.schema = "";
      this._data.form.entityName = "";
      this._data.form.daoName = "";
      this._data.form.mapperName = "";
    },
    // 递归获得完整路径
    getPath: function (node) {
      var parent = node.parent;
      if (parent && !(parent.data instanceof Array)) {
        var path = this.getPath(parent);
        return path + "/" + node.data.label;
      } else {
        return node.data.label;
      }
    },
    pathFormat: function (path) {
      var result = path;
      result = result.replace(/\/\//g, "/");
      return result;
    },
    // 列举本地的目录
    handlePathTreeClick(data, node) {
      var path = this.getPath(node);
      path = this.pathFormat(path);
      // 保存一下
      this._data.currentTreeNodePath = path;
      var api = "/directory/directory/list/";
      this.$http
        .get(api, {
          params: {
            path: path,
          },
        })
        .then((res) => {
          // 更新选中节点下的显示数据
          var body = res.body;
          var treeComponent = this.$refs.pathTree;
          treeComponent.updateKeyChildren(
            treeComponent.getCurrentNode().id,
            body.data
          );
        })
        .catch((e) => {
          this.$message.error("服务调用异常");
        });
    },
    // 设置选中的路径
    setSavePath() {
      this._data.form.savePath = this._data.currentTreeNodePath;
      this._data.saveDialogVisible = false;
    },
    // 打开路径选择对话框
    saveBtnClick(type) {
      this._data.saveDialogVisible = true;
      console.log(type);
    },
    handleClose(done) {},
    addDataSource() {
      var form = this._data.form;
      if (!form.url && !form.user && !form.password) {
        form.url = "jdbc:mysql://localhost:3306";
        form.user = "root";
        form.password = "123456";
      }
      var api = "/database/datasource/create";
      this.$http
        .put(api, form)
        .then((res) => {
          if (res.body.success) {
            this._data.dataSourceDialogVisible = false;
            this.$message.success("设置数据源成功");
          } else {
            this.$message.error(res.body.message);
          }
        })
        .catch((e) => {
          this.$message.error("服务调用异常");
        });
    },
  },
};
</script>
