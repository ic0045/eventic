import { MailService } from "@sendgrid/mail";

/*
------------------SENDGRID----------------------------------
*/

/*
* Serviço de e-mail send-grid
*/
const sgMail = new MailService();
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

/*
* Função de envio de e-mail de aleta para troca de email
*/
export async function sendAlertChangeEmail (email : string) :Promise<boolean>{
    const msg = {
        to: email,
        from: process.env.SENDGRID_EMAIL, 
        subject: 'Mudança de e-mail EventIC',
        html: createEmailBody("Seu e-mail foi modificado.",
        "Informamos que houve uma mudança de e-mail em seu cadastro no Eventic.",
        null, null)
    }
    try{ 
        let res = await sgMail.send(msg);
        if (res[0].statusCode == 202) return true;
        return false;
    }
    catch(e){ return false; }
}

/*
* Função de envio de e-mail para confirmação de cadastro
*/
export async function sendConfirmEmail (email : string, id : string) :Promise<boolean>{
    const redirectLink = `${process.env.PUBLIC_URL}/api/auth/confirm?confirm=${id}`;
    const msg = {
        to: email,
        from: process.env.SENDGRID_EMAIL, 
        subject: 'Verificação de cadastro EventIC',
        html: createEmailBody("Verifique seu e-mail.","Para concluir o cadastro no EventIC, verifique seu e-mail.",
        "Verificar e-mail", redirectLink)
    }
    try{ 
        let res = await sgMail.send(msg);
        if (res[0].statusCode == 202) return true;
        return false;
    }
    catch(e){ return false; }
}

/*
* Envio de e-mail para recuperação de senha
*/
export async function sendRecoveryEmail (email : string, id : string) :Promise<boolean>{
    const redirectLink = `${process.env.PUBLIC_URL}/auth/alterarsenha?recover=${id}`;
    const msg = {
        to: email,
        from: process.env.SENDGRID_EMAIL, 
        subject: 'Alteração de senha EventIC',
        html: createEmailBody("Altere sua senha.","Para concluir a alteração de senha, clique no botão abaixo.",
        "Alterar senha", redirectLink)
    }
    try{ 
        let res = await sgMail.send(msg);
        if (res[0].statusCode == 202) return true;
        return false;
    }
    catch(e){ return false; }
}

/*
* Cria o corpo de e-mail
*/
function createEmailBody(
    title : string,
    message: string,
    buttonText: string | null,
    redirectLink : string | null) : string 
{

    return `<div style="box-sizing:border-box;display:block;max-width:600px;margin:0 auto;padding:10px"><span style="color:transparent;display:none;height:0;max-height:0;max-width:0;opacity:0;overflow:hidden;width:0">${title}</span>
    <div style="box-sizing:border-box;width:100%;margin-bottom:30px;margin-top:15px">
    <table style="box-sizing:border-box;width:100%;border-spacing:0;border-collapse:separate!important" width="100%">
        <tbody>
            <tr>
                <td align="left" style="box-sizing:border-box;padding:0;font-family:'Open Sans','Helvetica Neue','Helvetica',Helvetica,Arial,sans-serif;font-size:16px;vertical-align:top;text-align:left" valign="top">
                    <span>
                        <img alt="Eventic" height="50" 
                        src= "https://computacao.ufba.br/sites/computacao.ufba.br/files/logo_dcc_1.png"
                        style="max-width:100%;border-style:none;width:137px;height:45px" width="137">
                    </a>
                    </span>
                </td>
            </tr>
        </tbody>
    </table>
    </div>

    <div style="box-sizing:border-box;width:100%;margin-bottom:30px;background:#ffffff;border:1px solid #f0f0f0">
    <table style="box-sizing:border-box;width:100%;border-spacing:0;border-collapse:separate!important" width="100%">
        <tbody>
            <tr>
                <td style="box-sizing:border-box;font-family:'Open Sans','Helvetica Neue','Helvetica',Helvetica,Arial,sans-serif;font-size:16px;vertical-align:top;padding:30px" valign="top">
                <table style="box-sizing:border-box;width:100%;border-spacing:0;border-collapse:separate!important" width="100%">
                    <tbody>
                        <tr>
                            <td style="box-sizing:border-box;padding:0;font-family:'Open Sans','Helvetica Neue','Helvetica',Helvetica,Arial,sans-serif;font-size:16px;vertical-align:top" valign="top">
                            <h2 style="margin:0;margin-bottom:30px;font-family:'Open Sans','Helvetica Neue','Helvetica',Helvetica,Arial,sans-serif;font-weight:300;line-height:1.5;font-size:24px;color:#294661!important">${message}</h2>
                            </td>
                        </tr>
                        <tr>
                            ${buttonText? `
                            <td style="box-sizing:border-box;padding:0;font-family:'Open Sans','Helvetica Neue','Helvetica',Helvetica,Arial,sans-serif;font-size:16px;vertical-align:top" valign="top">
                            <table cellpadding="0" cellspacing="0" style="box-sizing:border-box;border-spacing:0;width:100%;border-collapse:separate!important" width="100%">
                                <tbody>
                                    <tr>
                                        <td align="center" style="box-sizing:border-box;padding:0;font-family:'Open Sans','Helvetica Neue','Helvetica',Helvetica,Arial,sans-serif;font-size:16px;vertical-align:top;padding-bottom:15px" valign="top">
                                        <table cellpadding="0" cellspacing="0" style="box-sizing:border-box;border-spacing:0;width:auto;border-collapse:separate!important">
                                            <tbody>
                                                <tr>
                                                    <td align="center" bgcolor="#348eda" 
                                                    style="box-sizing:border-box;padding:0;font-family:'Open Sans','Helvetica Neue','Helvetica',Helvetica,Arial,sans-serif;font-size:16px;vertical-align:top;background-color:#348eda;border-radius:2px;text-align:center" valign="top">
                                                    <a href= ${redirectLink}
                                                    style="box-sizing:border-box;border-color:#348eda;font-weight:400;text-decoration:none;display:inline-block;margin:0;color:#ffffff;background-color:#348eda;border:solid 1px #348eda;border-radius:2px;font-size:14px;padding:12px 45px" 
                                                    target="_blank" data-saferedirecturl= ${redirectLink}>
                                                    ${buttonText}
                                                    </a>
                                                </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            </td>
                            `
                            :
                            ""
                            }
                        </tr>
                    </tbody>
                </table>
                </td>
            </tr>
        </tbody>
    </table>
    </div>

    <div style="box-sizing:border-box;clear:both;width:100%">
    <table style="box-sizing:border-box;width:100%;border-spacing:0;font-size:12px;border-collapse:separate!important" width="100%">
        <tbody>
            <tr style="font-size:12px">
                <td align="center" style="box-sizing:border-box;font-family:'Open Sans','Helvetica Neue','Helvetica',Helvetica,Arial,sans-serif;vertical-align:top;font-size:12px;text-align:center;padding:20px 0" valign="top">

                <p style="color:#294661;font-family:'Open Sans','Helvetica Neue','Helvetica',Helvetica,Arial,sans-serif;font-size:12px;font-weight:400;margin-bottom:5px;margin:10px 0 20px">Eventic</p>

                <p style="margin:0;color:#294661;font-family:'Open Sans','Helvetica Neue','Helvetica',Helvetica,Arial,sans-serif;font-weight:300;font-size:12px;margin-bottom:5px">Instituto de Computação - UFBA</p>
                </td>
            </tr>
        </tbody>
    </table>
    </div>
    </div>`
}

/*
* Classe de validação para operações relacionadas a entidade Usuario.
*/
export class UsuarioValidator{
    /*
    * Campos não nulos para cadastro de usuário
    */
    static notNullFields = ["primeiro_nome","segundo_nome","email","senha"]; 
   
    /*
    * Campos para corpo de requisição alterar perfil
    */
    static perfilBodyFields = ["primeiro_nome","segundo_nome","foto_perfil"]
   
    /*
    * Valida corpo de requisição para cadastro de usuário
    */
    static validateRegisterReqBody(body : any) : [boolean, string]{
        let missingFields = "";
        for(let field of this.notNullFields){
            if(!body.hasOwnProperty(field)) //if null
                missingFields += `${field}, `;
            else if(body[field].length === 0) //if length == 0
                missingFields += `${field}, `;
        }
    
        if(missingFields.length > 0)
            return [false, "Atributos pendentes: "+missingFields];
    
        if(!this.validateEmail(body.email))
            return [false, "E-mail inválido."];
    
        if(!this.validateNames(body.primeiro_nome, body.segundo_nome))
            return [false, "Nome de usuário inválido."];

        if(!this.validatePassword(body.senha))
            return [false, "Senha inválida"];
    
        return [true, missingFields]
    }

    /*
    * Valida corpo de requisição para alterar perfil contém campos necessários
    */
    static validatePerfilReqBody(body : any) : [boolean, string]{
        let missingFields = "";
        for(let field of this.perfilBodyFields)
            if(!body.hasOwnProperty(field))
                missingFields += `${field}, `;
        if(missingFields.length > 0)
            return [false, "Atributos pendentes: "+missingFields];
        if(!this.validateNames(body.primeiro_nome, body.segundo_nome))
            return [false, "Nomes de usuário inválidos."];
        return [true, missingFields]
    }

    /*
    * Valida corpo de requisição para alteração de perfil feita por admin.
    * Utiliza validatePerfilReqBody e requer email, permissão.
    * Senha opcional
    */
    static validateAdminPutPerfil(body: any): [boolean, string] {
        let [valid, errorMsg] = this.validatePerfilReqBody(body);
        if (valid) {
            let missingFields = "";
            if(!body.hasOwnProperty("email"))
                missingFields += `email, `;
            if(!body.hasOwnProperty("permissao"))
                missingFields += `permissao, `;
            if(missingFields.length > 0)
                return [false, "Atributos pendentes: "+missingFields];
            if(body.hasOwnProperty("senha") && !this.validatePassword(body.senha))
                return [false, "Senha inválida"];
            return [true, missingFields];
        }
        else return [valid, errorMsg];
    }

    /*
    * Valida nomes de usuário
    */
    static validateNames(firstName: string, secName: string): boolean {
        if(/\d/.test(firstName) || /\d/.test(secName)) //verifica se tem número
            return false;
        if(firstName.length < 2 || secName.length < 2)
            return false;
        return true;
    }

    /*
     * Valida email de usuário
     */
    static validateEmail(email: string): boolean {
        const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/;
        return regex.test(email);
    }

    /*
     * Valida senha do usuário
     */
    static validatePassword(password : string) : boolean{
        if(password != null && password.length < 6)
            return false;
        return true;
    }
}