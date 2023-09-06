// 登录模块
export namespace Login {
  export interface ReqCaptcha {
    uuid: string;
    img: string;
    captchaEnabled: boolean;
  }
  export interface ResPublicKey {
    code: string;
    uuid: string;
    tenantId: string;
    grantType: string;
  }
  export interface ReqLoginForm extends ResPublicKey {
    username: string;
    password: string;
  }
  export interface ReqMobileForm extends ResPublicKey {
    mobile: string;
    mobileCode: string;
  }
  export interface ReqEmailForm extends ResPublicKey {
    email: string;
    emailCode: string;
  }
  export interface ReqFormSubmit extends ReqLoginForm, ReqMobileForm, ReqEmailForm {}
  /**
   * 租户
   */
  export interface TenantVO {
    companyName: string;
    domain: any;
    tenantId: string;
  }
  export interface TenantInfo {
    tenantEnabled: boolean;
    voList: TenantVO[];
  }

  export interface ResLogin {
    access_token: string;
  }
  export interface ResAuthButtons {
    [key: string]: string[];
  }
}
