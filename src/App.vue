<template>
<el-container style="height: 850px; border: 1px solid #eee">
    <el-aside width="200px"  style="background-color: rgb(238, 241, 246)">
        <el-menu default-active="1-1">
            <el-menu-item index="1-1">
                <template slot="title"><i class="el-icon-sunny"></i>概览</template>
            </el-menu-item>
            <el-submenu index="2">
                <template slot="title"><i class="el-icon-document"></i>文本操作</template>
                <el-menu-item index="2-1">
                    <router-link to="/text/replace" tag="li">替换</router-link>
                </el-menu-item>
                <el-menu-item index="2-2">
                    <router-link to="/text/format" tag="li">格式化</router-link>
                </el-menu-item>
            </el-submenu>
            <el-submenu index="3">
                <template slot="title"><i class="el-icon-menu"></i>软件操作</template>
                <el-menu-item index="3-1">
                    <router-link to="/software/redis" tag="li">Redis</router-link>
                </el-menu-item>
                <el-menu-item index="3-2">
                    <router-link to="/software/mongodb" tag="li">MongoDB</router-link>
                </el-menu-item>
                <el-menu-item index="3-3">
                    <router-link to="/software/kafka" tag="li">Kafka</router-link>
                </el-menu-item>
                <el-menu-item index="3-4">
                    <router-link to="/software/zookeeper" tag="li">Zookeeper</router-link>
                </el-menu-item>
            </el-submenu>
            <el-submenu index="4">
                <template slot="title"><i class="el-icon-folder-opened"></i>数据库操作</template>
                <el-menu-item index="4-1">
                    <router-link to="/database/er" tag="li">ER图生成</router-link>
                </el-menu-item>
                <el-menu-item index="4-2">
                    <router-link to="/database/codeGenerate" tag="li">CodeGenerate</router-link>
                </el-menu-item>
            </el-submenu>
            <!-- <el-submenu index="5">
                <template slot="title"><i class="el-icon-coffee-cup"></i>JVM</template>
                <el-menu-item index="5-1">
                    <router-link to="/database/er" tag="li">内存布局</router-link>
                </el-menu-item>
                <el-menu-item index="5-2">
                    <router-link to="/database/codeGenerate" tag="li">GC回收器</router-link>
                </el-menu-item>
            </el-submenu> -->
            <el-submenu index="6">
                <template slot="title"><i class="el-icon-mobile"></i>GOTTY</template>
                <el-menu-item index="6-1">
                    <router-link to="/terminal/Local" tag="li">本地终端</router-link>
                </el-menu-item>
                <el-menu-item index="6-2">
                    <router-link to="/terminal/Remote" tag="li">远程终端</router-link>
                </el-menu-item>
            </el-submenu>
        </el-menu>
    </el-aside>

    <el-main>
        <router-view/>
    </el-main>
</el-container>
</template>

<style>
.el-header {
    background-color: #b3c0d1;
    color: #333;
    line-height: 60px;
}

.el-aside {
    color: #333;
}
</style>

<script>
export default {
    data() {
        return {
        };
    },
};
</script>
