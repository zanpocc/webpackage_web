<template>
<el-row :gutter="20">
    <el-col :span="8">
        <div class="grid-content bg-purple">
            <el-input type="textarea" :autosize="{ minRows: 35, maxRows: 35}" placeholder="请输入内容" v-model="textarea_old">
            </el-input>
        </div>
    </el-col>
    <el-col :span="4">
        <div class="grid-content bg-purple">
            <el-input type="textarea" @input="rule_change" :autosize="{ minRows: 15, maxRows: 15}" placeholder="请输入内容" v-model="textarea_rule">
            </el-input>
        </div>
        <div style="display:block;margin:5px;">
            <el-row :gutter="20" align="center">
                <el-col :span="8">
                    <el-button @click="clear_old">清空</el-button>
                </el-col>
                <el-col :span="8">
                    <el-button @click="replace_text" type="primary">替换</el-button>
                </el-col>
                <el-col :span="8">
                    <el-button @click="clear_new">清空</el-button>
                </el-col>
            </el-row>
        </div>
        <div>
            <el-table :data="table_rules" style="width: 100%">
                <el-table-column prop="old" label="原始值" width="120">
                </el-table-column>
                <el-table-column prop="new" label="新值" width="120">
                </el-table-column>
            </el-table>
        </div>
    </el-col>
    <el-col :span="8">
        <div class="grid-content bg-purple">
            <div class="grid-content bg-purple">
                <el-input type="textarea" :autosize="{ minRows: 35, maxRows: 35}" placeholder="请输入内容" v-model="textarea_new">
                </el-input>
            </div>
        </div>
    </el-col>
</el-row>
</template>

<style>
.el-row {
    margin-bottom: 20px;
}

.el-col {
    border-radius: 4px;
}

.bg-purple-dark {
    background: #99a9bf;
}

.bg-purple {
    background: #d3dce6;
}

.bg-purple-light {
    background: #e5e9f2;
}

.grid-content {
    border-radius: 4px;
    min-height: 36px;
}

.row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
}
</style>

<script>
export default {
    data() {
        return {
            textarea_old: '',
            textarea_new: '',
            textarea_rule: '',
            table_rules: [],
        };
    },
    methods: {
        clear_old: function () {
            this.textarea_old = '';
        },
        clear_new: function () {
            this.textarea_new = '';
        },
        replace_text: function () {
            this.textarea_new = '';
            var temp = this.textarea_old;
            for(var i = 0;i < this.table_rules.length;i++){
                var rule = this.table_rules[i];
                var reg = '/' + rule.old + '/g';
                temp = temp.replace(eval(reg),rule.new);
            }
            this.textarea_new = temp;
        },
        rule_change: function (v) {
            var newData = [];

            v = v + '';
            var lines = v.split('\n');
            for(var i = 0;i < lines.length;i++){
                var line = lines[i];
                if(!line || line === ''){
                   continue; 
                }
                var splits = line.split("=");
                var obj = {
                    old:splits[0],
                    new:splits[1]
                }
                newData.push(obj);
            }

            this.table_rules = newData;
        }
    }
};
</script>
