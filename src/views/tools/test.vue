<template>
    <el-button text @click="dialogVisible = true">
        click to open the Dialog
    </el-button>
    <el-dialog v-model="dialogVisible" title="Tips" width="90%" :before-close="handleClose">
        <el-upload class="upload-demo" drag action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15" multiple>
            <el-icon class="el-icon--upload"><upload-filled /></el-icon>
            <div class="el-upload__text">
                Drop file here or <em>click to upload</em>
            </div>
            <template #tip>
                <div class="el-upload__tip">
                    是否更新已经存在的用户数据
                    仅允许导入xls、xlsx格式文件。
                    下载模板
                </div>
            </template>
        </el-upload>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogVisible = false">Cancel</el-button>
                <el-button type="primary" @click="dialogVisible = false">
                    Confirm
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>
  
<script lang="ts" setup>
import { ref } from 'vue'
import { ElMessageBox } from 'element-plus'
import { UploadFilled } from '@element-plus/icons-vue'
const dialogVisible = ref(false)

const handleClose = (done: () => void) => {
    ElMessageBox.confirm('Are you sure to close this dialog?')
        .then(() => {
            done()
        })
        .catch(() => {
            // catch error
        })
}
</script>
<style scoped>
.dialog-footer button:first-child {
    margin-right: 10px;
}
</style>
  