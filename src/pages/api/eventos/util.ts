import {clientMailService, mailService } from "../services/mailService"; 

/*
* Classe para operações envolvendo e-mails de notificação de evento.
*/
export class EventoMails {

    static batchMailService = clientMailService;
    static notificationMailService = mailService;

    /*
    * Retorna o tempo em Unix Timestamp
    */
    static getUnixTimestamp(miliseconds = Date.now()) : number{
        return Math.floor(miliseconds/1000);
    }

    /*
    * Gera id de batch para a inscrição
    */
   static async createBatch() : Promise<string | null> {
        const request = {
            url: '/v3/mail/batch',
            method: 'POST' as const,
        };
        try{
            let [res, body] = await this.batchMailService.request(request);
            if(res.statusCode === 201)
                return body.batch_id;
            else{
                console.log("Id de Batch não gerado: "+body.errors);
                return null;
            }
        }catch(e){console.log("Error ao gerar id de batch: "+e);}
        return null;
   }

    /*
    *   Pausa o envio programado de um batch
    */
    static async pauseBatch(batchId : string) : Promise<boolean> {
        const request = {
            url: '/v3/user/scheduled_sends',
            method: 'POST' as const,
            body: {
                "batch_id": batchId,
                "status": "pause"
            }
        };
        try{
            let [res, body] = await this.batchMailService.request(request);
            if(res.statusCode === 201)
                return true;
            else{
                console.log("Notificação não pausada: "+body.errors);
                return false;
            }
        }catch(e){console.log("Error ao pausar envio de notificação: "+e);}
        return false;
    }

    /*
    *   Deleta o cancelamento ou pause do batch para reativar o envio programado.
    */
    static async reactivateBatch(batchId : string) : Promise<boolean>{
        const request = {
            url: `/v3/user/scheduled_sends/${batchId}`,
            method: 'DELETE' as const,
        };
        try{
            let [res, body] = await this.batchMailService.request(request);
            if(res.statusCode === 201)
                return true;
            else{
                console.log("Notificação não reativada: "+body.errors);
                return false;
            }
        }catch(e){ console.log("Error ao reativar envio de notificação: "+e); }
        return false;
    }

    /*
    *   Envia e-mail de notificação
    */
    static async sendScheduledEmail(email : string, batchId : string,
         title : string, start : Date, image : string) : Promise<boolean>{
        //Cacula tempo para enviar e-mail: 1 hora antes do início do evento
        const notificationDate = new Date(start.getFullYear(),start.getMonth(), start.getDate(),
        start.getHours() -1, start.getMinutes());
        let notifyAt;    
        if(notificationDate.getTime() <= Date.now()) //se já está menos do tempo, envio no momento do evento
            notifyAt = this.getUnixTimestamp(start.getTime());
        else
            notifyAt = this.getUnixTimestamp(notificationDate.getTime())    
        
        const msg = 
        {
            to: email,
            from: {email: process.env.SENDGRID_EMAIL, name: 'EventIC'},
            subject: 'EventIC notificação de evento',
            batchId: batchId,
            sendAt: notifyAt,
            html: this.createSheduledEmailBody(start, title, image)
        };

        try{ 
            let res = await this.notificationMailService.send(msg);
            if (res[0].statusCode == 202){
                console.log(`[SENDGRID ENVIADO] => email==${msg.to} | sendAt==${msg.sendAt}`);
                return true;
            }
            console.log(`[SENDGRID NAO ENVIADO] => Status=${res[0].statusCode}, Body=${res[0].body}, Headers=${res[0].headers}`);
            return false;
        } catch(e){ 
            console.log(`[SENDGRID ERROR] => ${e}`);
            return false; }
    }

    /*
    *   Cria corpo do e-mail de notificação
    */
    private static createSheduledEmailBody(start : Date, title : string, image : string){
    return `
    <div style="box-sizing:border-box;display:block;max-width:600px;margin:0 auto;padding:10px"><span style="color:transparent;display:none;height:0;max-height:0;max-width:0;opacity:0;overflow:hidden;width:0">Notificação de evento</span>
    <div style="box-sizing:border-box;width:100%;margin-bottom:30px;margin-top:15px">
    <table style="box-sizing:border-box;width:100%;border-spacing:0;border-collapse:separate!important" width="100%">
        <tbody>
            <tr>
                <td align="left" style="box-sizing:border-box;padding:0;font-family:'Open Sans','Helvetica Neue','Helvetica',Helvetica,Arial,sans-serif;font-size:16px;vertical-align:top;text-align:left" valign="top">
                    <div style="width:100%;background-color:#f9f6f6;display: flex;flex-direction: row;align-items: center; justify-content: space-between;">
                        <img alt="Eventic"
                        src="https://i.ibb.co/3hkLvmm/eventic-Logo.png"
                        style="max-width:100%;border-style:none;width:200px;height:80px"
                        >
                        
                        <img alt="IC-UFBA" 
                        src= "https://computacao.ufba.br/sites/computacao.ufba.br/files/logo_dcc_1.png"
                        style="max-width:100%;border-style:none;width:137px;height:45px">
                    </div>
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
                        <tr style="display: flex;flex-direction: row;align-items: center; gap: 15px;">
                            
                            <td style="" valign="top">
                            <img alt="Evento imagem" height="50" 
                            src= ${image} style="max-width:100%;border-style:none;width:137px;height:45px" width="137">
                            </td>
                                
                            <td style="" valign="top">
                                <h2 style="font-family:'Open Sans','Helvetica Neue','Helvetica',Helvetica,Arial,sans-serif;font-weight:300;line-height:1.5;font-size:24px;color:#294661!important">
                                O evento ${title} começa em uma hora.
                                </h2>
                                <h3 style="font-family:'Open Sans','Helvetica Neue','Helvetica',Helvetica,Arial,sans-serif;font-weight:100;line-height:1.0;font-size:20px;color:#294661!important">
                                ${`${start.getHours()}:${start.getMinutes()} - ${start.getDate()}/${start.getMonth()}`}
                                </h3>
                            </td>
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
            <tr style="font-size:12px;background-color: #f9f6f6;">
                <td align="center" style="box-sizing:border-box;font-family:'Open Sans','Helvetica Neue','Helvetica',Helvetica,Arial,sans-serif;vertical-align:top;font-size:12px;text-align:center;padding:20px 0" valign="top">

                <p style="color:#294661;font-family:'Open Sans','Helvetica Neue','Helvetica',Helvetica,Arial,sans-serif;font-size:12px;font-weight:400;margin-bottom:5px;margin:10px 0 20px">Eventic</p>

                <p style="margin:0;color:#294661;font-family:'Open Sans','Helvetica Neue','Helvetica',Helvetica,Arial,sans-serif;font-weight:300;font-size:12px;margin-bottom:5px">Instituto de Computação - UFBA</p>
                </td>
            </tr>
        </tbody>
    </table>
    </div>
    </div>
    `
    }
}

/*
* Classe de validação para operações relacionadas a entidade Evento.
*/
export class EventoValidator {
    /*
    * Campos não nulos da entidade Evento
    */
    static requiredFields = ["descricao", "localizacao", "data_inicial", "titulo", "imagem_url"];

    /*
    *Verifica se a requisição contém todos campos necessários para criação do evento.
    */
    static validateNotNullFields(body: any): [boolean, string] {
        var missingFields = "";
        for (var field of this.requiredFields) {
            if (!body.hasOwnProperty(field)) //if null
                missingFields += `${field}, `;
            else if (typeof body[field] === 'string' && body[field].length === 0) //if length == 0
                missingFields += `${field}, `;
        }

        if (missingFields.length > 0)
            return [false, "Atributos pendentes: " + missingFields];

        return [true, missingFields]
    }
}