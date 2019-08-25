<template>
  <div>
    <el-card class="material">
      <el-row slot="header">
        <bread-crumb>
          <template slot="title">素材管理</template>
        </bread-crumb>
      </el-row>
      <el-tabs v-model="activeName" @tab-click="changeTab">
        <el-tab-pane v-loading="loading" label="全部" name="all">
          <el-row type="flex" justify="flex-start" style="flex-wrap: wrap;">
            <el-card
              class="img-card"
              v-for="item in materialList"
              :key="item.id"
              :body-style="{ padding: '0px'}"
            >
              <img :src="item.url" />
              <div class="bottom-bar">
                <el-row
                  class="bottom-icon"
                  type="flex"
                  justify="space-around"
                  style="padding: 14px"
                >
                  <i
                    :style="{color: item.is_collected ? 'red' : ''}"
                    @click="changeCollect(item)"
                    class="el-icon-star-off"
                  ></i>
                  <i @click="delMaterial(item)" class="el-icon-delete"></i>
                </el-row>
              </div>
            </el-card>
          </el-row>
          <el-row class="pagination">
            <el-pagination
              :current-page="page.currentPage"
              :page-size="page.perPage"
              :total="page.total"
              background
              layout="prev, pager, next"
              @current-change="changePage"
            ></el-pagination>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="收藏" name="collect">
          <el-row type="flex" justify="flex-start" style="flex-wrap: wrap;">
            <el-card
              class="img-card"
              v-for="item in materialList"
              :key="item.id"
              :body-style="{ padding: '0px'}"
            >
              <img :src="item.url" />
              <div class="bottom-bar">
                <el-row
                  class="bottom-icon"
                  type="flex"
                  justify="space-around"
                  style="padding: 14px"
                >
                  <i
                    :style="{color: item.is_collected ? 'red' : ''}"
                    @click="changeCollect(item)"
                    class="el-icon-star-off"
                  ></i>
                  <i @click="delMaterial(item)" class="el-icon-delete"></i>
                </el-row>
              </div>
            </el-card>
          </el-row>
          <el-row class="pagination">
            <el-pagination
              :current-page="page.currentPage"
              :page-size="page.perPage"
              :total="page.total"
              background
              layout="prev, pager, next"
              @current-change="changePage"
            ></el-pagination>
          </el-row>
        </el-tab-pane>
      </el-tabs>
      <el-upload action="" :http-request="uploadMaterial" :show-file-list="false">
        <el-button class="uploadBtn" type="primary">上传素材</el-button>
      </el-upload>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loading: false,
      activeName: 'all',
      materialList: [],
      page: {
        total: 0,
        perPage: 15,
        currentPage: 1
      }
    }
  },
  methods: {
    changePage (currentPage) {
      this.page.currentPage = currentPage
      this.getMaterial()
    },
    delMaterial (item) {
      this.$confirm('是否删除本素材', '删除', {
        confirmButtonText: '删除',
        type: 'error'
      }).then(() => {
        this.$axios({
          method: 'delete',
          url: `/user/images/${item.id}`
        }).then(result => {
          this.$message({
            type: 'info',
            message: '删除成功'
          })
          this.getMaterial()
        })
      })
    },
    changeCollect (item) {
      this.$axios({
        method: 'put',
        url: `/user/images/${item.id}`,
        data: {
          collect: !item.is_collected
        }
      }).then(result => {
        let message = item.is_collected ? '取消收藏' : '收藏'
        this.$message(`${message}成功`)
        this.getMaterial()
      })
    },
    getMaterial () {
      this.loading = true
      const page = {
        page: this.page.currentPage,
        per_page: this.page.perPage
      }
      this.$axios({
        url: '/user/images',
        params: {
          collect: this.activeName !== 'all',
          ...page
        }
      }).then(result => {
        this.materialList = result.data.results
        this.page.total = result.data.total_count
        this.loading = false
      })
    },
    changeTab (tab, event) {
      this.activeName = tab.name
      this.getMaterial()
    },
    uploadMaterial (params) {
      const formData = new FormData()
      formData.append('image', params.file)
      this.$axios({
        url: '/user/images',
        method: 'post',
        data: formData
      }).then(result => {
        this.$message({ message: '上传成功', type: 'success' })
        this.getMaterial()
      })
    }
  },
  created () {
    this.getMaterial()
  }
}
</script>

<style lang="less" scoped>
.material {
  position: relative;
  .el-tabs {
    .img-card {
      width: 180px;
      margin-top: 20px;
      margin-right: 20px;
      position: relative;
      &:nth-child(5n) {
        margin-right: 0;
      }
      img {
        width: 100%;
        height: 150px;
      }
      .bottom-bar {
        height: 40px;
        .bottom-icon {
          width: 100%;
          position: absolute;
          bottom: 0;
        }
      }
    }
    .pagination {
      display: flex;
      justify-content: center;
      .el-pagination {
        margin-top: 20px;
      }
    }
  }
  .uploadBtn {
    position: absolute;
    right: 20px;
    top: 60px;
  }
}
</style>
