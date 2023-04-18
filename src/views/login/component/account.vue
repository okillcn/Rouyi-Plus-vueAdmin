<template>
	<el-form size="large" class="login-content-form" :model="state.ruleForm" :rules="state.rules" label-position="top">
		<el-form-item class="login-animation1" prop="username">
			<el-input text :placeholder="$t('message.account.accountPlaceholder1')" v-model="state.ruleForm.username"
				clearable autocomplete="off" @input="onVerifyCnAndSpace($event)">
				<template #prefix>
					<el-icon class="el-input__icon"><ele-User /></el-icon>
				</template>
			</el-input>
		</el-form-item>
		<el-form-item class="login-animation2" prop="password">
			<el-input :type="state.isShowPassword ? 'text' : 'password'" @input="onVerifyPassword($event)"
				:placeholder="$t('message.account.accountPlaceholder2')" v-model="state.ruleForm.password"
				autocomplete="off">
				<template #prefix>
					<el-icon class="el-input__icon"><ele-Unlock /></el-icon>
				</template>
				<template #suffix>
					<i class="iconfont el-input__icon login-content-password"
						:class="state.isShowPassword ? 'icon-yincangmima' : 'icon-xianshimima'"
						@click="state.isShowPassword = !state.isShowPassword">
					</i>
				</template>
			</el-input>
		</el-form-item>
		<el-form-item class="login-animation3" prop="code">
			<el-col :span="15">
				<el-input text maxlength="4" :placeholder="$t('message.account.accountPlaceholder3')"
					v-model="state.ruleForm.code" clearable autocomplete="off">
					<template #prefix>
						<el-icon class="el-input__icon"><ele-Position /></el-icon>
					</template>
				</el-input>
			</el-col>
			<el-col :span="1"></el-col>
			<el-col :span="8">
				<el-button class="login-content-code" @click="onGetCode()">
					<img :src="state.CodeImg" alt="验证码" />
				</el-button>
			</el-col>
		</el-form-item>
		<el-form-item class="login-animation4">
			<el-button type="primary" class="login-content-submit" round v-waves @click="onSignIn"
				:loading="state.loading.signIn">
				<span>{{ $t('message.account.accountBtnText') }}</span>
			</el-button>
		</el-form-item>
	</el-form>
</template>

<script setup lang="ts" name="loginAccount">
import { reactive, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import { useI18n } from 'vue-i18n';
import { initBackEndControlRoutes } from '/@/router/backEnd';
import { Session } from '/@/utils/storage';
import { formatAxis } from '/@/utils/formatTime';
import { NextLoading } from '/@/utils/loading';
import {
	verifyCnAndSpace,
} from '/@/utils/toolsValidate';
import { useLoginApi } from '/@/api/login';

// 定义变量内容
const { t } = useI18n();
const route = useRoute();
const router = useRouter();
const state = reactive({
	isShowPassword: false,
	CodeImg: "",
	CodeI: 0,
	ruleForm: {
		username: 'admin',
		password: 'admin123',
		code: '',
		uuid: '',
	},
	loading: {
		signIn: false,
	},
	rules: {
		username: [
			{ required: true, message: t('message.account.accountPlaceholder1'), trigger: 'blur' },
			{ min: 4, max: 20, message: t('message.account.accountPlaceholder1'), trigger: 'blur' },
		],
		password: [
			{ required: true, message: t('message.account.accountPlaceholder2'), trigger: 'blur' },
			{ min: 5, max: 20, message: t('message.account.accountPlaceholder2'), trigger: 'blur' },
		],
		cathcode: [
			{ required: true, message: t('message.account.accountPlaceholder3'), trigger: 'blur' },
			{ min: 1, max: 8, message: t('message.account.accountPlaceholder3'), trigger: 'blur' },
		],
	},
});

// 去掉中文及空格
const onVerifyCnAndSpace = (val: string) => {
	state.ruleForm.username = verifyCnAndSpace(val);
};
const onVerifyPassword = (val: string) => {
	state.ruleForm.password = verifyCnAndSpace(val);
};


//获取验证码
const onGetCode = async () => {
	if (state.CodeI > 5) {
		ElMessage.error("冷却10秒");
		setTimeout(() => {
			state.CodeI = 0;
		}, 10000);
		return;
	}
	state.CodeI++;
	useLoginApi().getCodeImg().then(async (res) => {
		state.CodeImg = "data:image/png;base64," + res.data.img;
		state.ruleForm.uuid = res.data.uuid;
	});
}
onGetCode();

// 时间获取
const currentTime = computed(() => {
	return formatAxis(new Date());
});


// 登录
const onSignIn = async () => {
	state.loading.signIn = true;// 开启登录按钮 loading 状态
	useLoginApi().signIn(state.ruleForm).then(async (res) => {
		if (res.code != 200) {
			onGetCode();
			ElMessage.error(res.msg);
			return;
		}
		Session.setToken(res.data.token);
		const isNoPower = await initBackEndControlRoutes();
		signInSuccess(isNoPower);
	}).catch((err) => {
		ElMessage.error(err);
	}).finally(() => {
		state.loading.signIn = false;// 关闭登录按钮 loading 状态
	});

};
// 登录成功后的跳转
const signInSuccess = (isNoPower: boolean | undefined) => {
	if (isNoPower) {
		ElMessage.warning('抱歉，您没有登录权限');
		Session.clear();
	} else {
		// 初始化登录成功时间问候语
		let currentTimeInfo = currentTime.value;
		// 登录成功，跳到转首页
		// 如果是复制粘贴的路径，非首页/登录页，那么登录成功后重定向到对应的路径中
		if (route.query?.redirect) {
			router.push({
				path: <string>route.query?.redirect,
				query: Object.keys(<string>route.query?.params).length > 0 ? JSON.parse(<string>route.query?.params) : '',
			});
		} else {
			router.push('/');
		}
		// 登录成功提示
		const signInText = t('message.signInText');
		ElMessage.success(`${currentTimeInfo}，${signInText}`);
		NextLoading.start();// 添加 loading，防止第一次进入界面时出现短暂空白
	}
	state.loading.signIn = false;
};

</script>

<style scoped lang="scss">
.login-content-form {
	margin-top: 20px;

	@for $i from 1 through 4 {
		.login-animation#{$i} {
			opacity: 0;
			animation-name: error-num;
			animation-duration: 0.5s;
			animation-fill-mode: forwards;
			animation-delay: calc($i/10) + s;
		}
	}

	.login-content-password {
		display: inline-block;
		width: 20px;
		cursor: pointer;

		&:hover {
			color: #909399;
		}
	}

	.login-content-code {
		width: 100%;
		padding: 4px;
		height: 100%;

		img {
			margin: 0;
			font-weight: bold;
			letter-spacing: 5px;
			width: 100%;
			height: 100%;
		}
	}

	.login-content-submit {
		width: 100%;
		letter-spacing: 2px;
		font-weight: 300;
		margin-top: 15px;
	}
}

.login-content-form {
	:deep(.el-form-item--small.el-form-item) {
		margin-bottom: 0 !important;
	}

	.login-content-form-msg {
		color: #666666;
		font-size: 14px;
		width: 100%;

		.login-content-form-msg-red {
			color: red;
		}
	}

	.login-content-form-msg+div {
		width: 100%;
	}
}
</style>
