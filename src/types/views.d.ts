/**
 * views personal
 */
type NewInfo = {
	title: string;
	date: string;
	link: string;
};
type Recommend = {
	title: string;
	msg: string;
	icon: string;
	bg: string;
	iconColor: string;
};
declare type PersonalState = {
	newsInfoList: NewInfo[];
	recommendList: Recommend[];
	personalForm: {
		createBy: string,
		createTime: string,
		updateBy: string,
		updateTime: string,
		userId: string,
		deptId: number,
		userName: string,
		nickName: string,
		password: string,
		userType: string | null,
		email: string,
		phonenumber: string,
		sex: "0" | "1" | "2",
		avatar: string,
		status: "0" | "1",
		delFlag: "0" | "1",
		loginIp: string,
		loginDate: string,
		remark: string,
		dept: RowDeptType,
		roles: any,
		roleIds: [],
		postIds: [],
		roleId: number,
		admin: boolean,
		[k: string]: T;
	};
};

/**
 * views visualizing
 */
declare type Demo2State<T = any> = {
	time: {
		txt: string;
		fun: number;
	};
	dropdownList: T[];
	dropdownActive: string;
	skyList: T[];
	dBtnList: T[];
	chartData4Index: number;
	dBtnActive: number;
	earth3DBtnList: T[];
	chartData4List: T[];
	myCharts: T[];
};

/**
 * views params
 */
declare type ParamsState = {
	value: string;
	tagsViewName: string;
	tagsViewNameIsI18n: boolean;
};

/**
 *RoleTableType
 * 角色数据类型
 **/
declare interface RowRoleType {
	createBy: string;
	createTime: string;
	updateBy: string;
	updateTime: string;
	roleId: number;
	roleName: string;
	roleKey: string;
	roleSort: number;
	dataScope: string;
	menuCheckStrictly: boolean;
	deptCheckStrictly: boolean;
	status: string;
	delFlag: string;
	remark: string;
	flag: boolean;
	menuIds: [];
	deptIds: [];
	admin: boolean;
	[k: string]: any;
}

interface SysRoleTableType extends TableType {
	data: RowRoleType[];
}

declare interface SysRoleState {
	tableData: SysRoleTableType;
}

declare type TreeType = {
	id: number;
	label: string;
	weight: number;
	parentId: number | string;
	children?: TreeType[];
};

/**
 * RowPostType
 * 岗位数据类型
 */
declare type RowPostType<T = any> = {
	createBy: string;
	createTime: string;
	updateBy: string;
	updateTime: string;
	postId: T;
	postCode: string;
	postName: string;
	postSort: number;
	status: string;
	remark: string;
	flag: boolean;
};

/**
 * 用户数据类型
 * @param T
 * RowUserType
 * */
declare type RowUserType<T = any> = {
	createBy: string,
	createTime: string,
	updateBy: string,
	updateTime: string,
	userId: string,
	deptId: number,
	userName: string,
	nickName: string,
	password: string,
	userType: string | null,
	email: string,
	phonenumber: string,
	sex: "0" | "1" | "2",
	avatar: string,
	status: "0" | "1",
	delFlag: "0" | "1",
	loginIp: string,
	loginDate: string,
	remark: string,
	dept: RowDeptType,
	roles: any,
	roleIds: [],
	postIds: [],
	roleId: number,
	admin: boolean,
	[k: string]: T;
};


interface SysUserTableType extends TableType {
	data: RowUserType[];
}

declare interface SysUserState {
	[x: string]: any;
	tableData: SysUserTableType;
}


/**
 * 菜单数据类型
 * @param T
 * RowMenuType
 */
declare type RowMenuType<T = any> = {
	createBy: string;
	createTime: string;
	updateBy: string;
	updateTime: string;
	parentName: string;
	parentId: number;
	children: RowMenuType[];
	menuId: number;
	menuName: string;
	orderNum: number;
	path: string;
	component: string;
	queryParam: string;
	isFrame: string;
	isAffix: string,
	isIframe: string,
	isCache: string;
	menuType: string;
	visible: string;
	status: string;
	perms: string;
	icon: string;
	remark: string;
	[k: string]: T;
};

interface SysMenuTableType extends TableType {
	data: RowMenuType[];
}

declare interface SysMenuState {
	[x: string]: any;
	tableData: SysMenuTableType;
}


/**
 * 部门树形数据类型
 * @param T
 * DeptTreeType
 * */
declare type DeptTreeType = {
	deptName: string;
	createTime: string;
	status: boolean;
	sort: number;
	describe: string;
	id: number | string;
	children?: DeptTreeType[];
};

/**
 * 部门数据类型
 * @param T
 * RowDeptType
 * */
declare type RowDeptType<T = any> = {
	createBy: string | null,
	createTime: string | null,
	updateBy: string | null,
	updateTime: string | null,
	parentName: string | null,
	parentId: number | null,
	children: T[],
	deptId: number,
	deptName: string,
	orderNum: number | null,
	leader: string,
	phone: string | null,
	email: string | null,
	status: "0" | "1" | null,
	delFlag: "0" | "1" | null,
	ancestors: string | null
	[k: string]: T;
}

interface SysDeptTableType extends TableType {
	data: DeptTreeType[];
}

declare interface SysDeptState {
	tableData: SysDeptTableType;
}


type ListType = {
	id: number;
	label: string;
	value: string;
};

/**
 * 字典数据类型
 */
declare interface RowDicType {
	dicName: string;
	fieldName: string;
	describe: string;
	status: boolean;
	createTime: string;
	list: ListType[];
}

interface SysDicTableType extends TableType {
	data: RowDicType[];
}

declare interface SysDicState {
	tableData: SysDicTableType;
}

/**
 * views pages
 */
//  filtering
declare type FilteringChilType = {
	id: number | string;
	label: string;
	active: boolean;
};

declare type FilterListType = {
	img: string;
	title: string;
	evaluate: string;
	collection: string;
	price: string;
	monSales: string;
	id: number | string;
	loading?: boolean;
};

declare type FilteringRowType = {
	title: string;
	isMore: boolean;
	isShowMore: boolean;
	id: number | string;
	children: FilteringChilType[];
};

// tableRules
declare type TableRulesHeaderType = {
	prop: string;
	width: string | number;
	label: string;
	isRequired?: boolean;
	isTooltip?: boolean;
	type: string;
};

declare type TableRulesState = {
	tableData: {
		data: EmptyObjectType[];
		header: TableRulesHeaderType[];
		option: SelectOptionType[];
	};
};

declare type TableRulesOneProps = {
	name: string;
	email: string;
	autograph: string;
	occupation: string;
};

// tree
declare type RowTreeType = {
	id: number;
	label: string;
	label1: string;
	label2: string;
	isShow: boolean;
	children?: RowTreeType[];
};

// workflow index
declare type NodeListState = {
	id: string | number;
	nodeId: string | undefined;
	class: HTMLElement | string;
	left: number | string;
	top: number | string;
	icon: string;
	name: string;
};

declare type LineListState = {
	sourceId: string;
	targetId: string;
	label: string;
};

declare type XyState = {
	x: string | number;
	y: string | number;
};

declare type WorkflowState<T = any> = {
	leftNavList: T[];
	dropdownNode: XyState;
	dropdownLine: XyState;
	isShow: boolean;
	jsPlumb: T;
	jsPlumbNodeIndex: null | number;
	jsplumbDefaults: T;
	jsplumbMakeSource: T;
	jsplumbMakeTarget: T;
	jsplumbConnect: T;
	jsplumbData: {
		nodeList: NodeListState[];
		lineList: LineListState[];
	};
};

// workflow drawer
declare type WorkflowDrawerNodeState<T = any> = {
	node: { [key: string]: T };
	nodeRules: T;
	form: T;
	tabsActive: string;
	loading: {
		extend: boolean;
	};
};

declare type WorkflowDrawerLabelType = {
	type: string;
	label: string;
};

declare type WorkflowDrawerState<T = any> = {
	isOpen: boolean;
	nodeData: {
		type: string;
	};
	jsplumbConn: T;
};

/**
 * views make
 */
// tableDemo
declare type TableDemoPageType = {
	pageNum: number;
	pageSize: number;
};

declare type TableHeaderType = {
	key: string;
	width: string;
	title: string;
	type: string | number;
	colWidth: string;
	width?: string | number;
	height?: string | number;
	isCheck: boolean;
};

declare type TableSearchType = {
	label: string;
	prop: string;
	placeholder: string;
	required: boolean;
	type: string;
	options?: SelectOptionType[];
};

declare type TableDemoState = {
	tableData: {
		data: EmptyObjectType[];
		header: TableHeaderType[];
		config: {
			total: number;
			loading: boolean;
			isBorder: boolean;
			isSelection: boolean;
			isSerialNo: boolean;
			isOperate: boolean;
		};
		search: TableSearchType[];
		param: EmptyObjectType;
		printName: string;
	};
};



