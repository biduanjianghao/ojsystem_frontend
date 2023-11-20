import ACCESSENUM from "@/access/ACCESSENUM";

/**
 * 检查权限
 * @param loginUser 用户权限
 * @param needAccess 页面需要的权限
 * @return boolean 有权限true 没有false
 */
const checkAccess = (loginUser: any, needAccess = ACCESSENUM.NOT_LOGIN) => {
  // 如果没有登录
  const loginUserAccess = loginUser?.role ?? ACCESSENUM.NOT_LOGIN;
  // 需要用户登录
  if (needAccess === ACCESSENUM.USER) {
    if (loginUserAccess === ACCESSENUM.NOT_LOGIN) return false;
  }
  //需要管理员权限
  if (needAccess === ACCESSENUM.ADMIN) {
    if (loginUserAccess !== ACCESSENUM.ADMIN) return false;
  }
  return true;
};

export default checkAccess;
