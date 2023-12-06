class Modal {
    modal;
    submit_res;

    // сборка
    constructor(data) { //
        this.data = {
            // These are the defaults.
            classModal: '', // класс для модального окна
            idModal: '', // класс для модального окна
            mode: 'center', // center | top | right
            title: 'Заголовок окна',
            desc: '',
            content: '', // HTML-контент
            width: '', // задаем ширину окна "560" / " " (авто)
            esc: true, // закрыть по клавише ESC
            closeBackground: true, // закрыть по фону
            eventCloseModal:'',
            footerEvents:{
                cancel: {
                    active: true,
                    title: 'Отменить',
                    nameClass: '',
                    callback:'',
                    callback_params:{}
                },
                submit: {
                    active: true,
                    title: 'Готово',
                    nameClass: '',
                    callback:function(modalClass){
                    },
                    callback_params:{}
                }
            }
        };

        this.data = mergeJson(this.data, data);


        // сборка
        this.template();
        this.initModal();
        this.events();
    }
    
    
    template() {
        let widthModal = (this.data.width !== undefined && this.data.width !== '') ? 'style="width: '+this.data.width+'" ' : '',
            footerBtn = this.data.footerEvents,
            classModal = (this.data.classModal !== undefined && this.data.classModal != '') ? this.data.classModal : '',
            footerBtnCancel = (this.data.footerEvents.cancel != undefined && this.data.footerEvents.cancel.title !== undefined && this.data.footerEvents.cancel.title !== '') ? this.data.footerEvents.cancel.title : 'Cancel title',
            footerBtnSubmit = (this.data.footerEvents.submit.title !== undefined && this.data.footerEvents.submit.title !== '') ? this.data.footerEvents.submit.title : 'Submit title',
            footerBtnSubmitClass = (this.data.footerEvents.submit.nameClass !== undefined && this.data.footerEvents.submit.nameClass !== '') ? this.data.footerEvents.submit.nameClass : '';

        // template
        var idModal = Date.now();
        idModal = "modal_"+idModal;
        if(this.data.idModal!=''){
            idModal = this.data.idModal;
        }
        let html = `
        <div class="v-modal ${classModal}" direction="${this.data.mode}" id="${idModal}" data-id="${idModal}">
            <div class="container-body" `+widthModal+`>
                <div class="modal-header">
                    <div class="header-info">
                        <h3 class="title">${this.data.title}</h3>`;
                        if ( this.data.desc !== undefined && this.data.desc !== '' ) {
                            html += `<p class="desc">${this.data.desc}</p>`;
                        }
                        html += `
                    </div>
                    <button type="button" class="btn btn-close-modal"><i class="icon close"></i></button>
                </div>
                
                <div class="modal-content">
                    ${this.data.content}
                </div>`;
                    if (footerBtn != undefined && Object.keys(footerBtn).length && (this.data.footerEvents.cancel.active == true || this.data.footerEvents.submit.active == true)) {
                        html += `
                                <div class="modal-footer">`;
                        if (this.data.footerEvents.cancel.active == true) {
                            html += `<button class="btn btn-outline btn-light cancel">`+footerBtnCancel+`</button>`;
                        }
                        if (this.data.footerEvents.submit.active == true) {
                            html += `<button class="btn btn-primary submit ${footerBtnSubmitClass}">`+footerBtnSubmit+`</button>`;
                        }
                        html += `</div>`;
                    }
                    html += `
            </div>
        </div>`;

        html = $(html);
        this.modal = html;

        if(this.data.footerEvents.submit.callback!=undefined){
            html.find('.submit').click(()=>{
                this.submit_res = this.data.footerEvents.submit.callback(this, this.data.footerEvents.submit.callback_params);
            });
        }

        $('body').append(html);
    }

    // инициализация
    initModal() {
        $('body').addClass('no-scroll');
        setTimeout( () => {
            this.modal.addClass('open');
        }, 50);
    }

    // события
    events() {
        // Закрыть модальное окно по крестику
        this.modal.find('.btn-close-modal').click(() => {
            this.closeModal();
        });

        this.modal.find('.cancel').click(() => {
            if(this.data.footerEvents.cancel.callback!=undefined && this.data.footerEvents.cancel.callback!=''){
                this.data.footerEvents.cancel.callback(this, this.data.footerEvents.cancel.callback_params);
            }else{
                this.closeModal();
            }
        });

        // Закрыть модальное окно по фону
        this.modal.mousedown((e) => {
            if($(e.target).closest(".v-modal").length && $(e.target).closest(".container-body").length == 0 && this.data.closeBackground != false && !$(e.target).hasClass('.container-body')) {
                this.closeModal();
            }
        });

        // закрыть по esc
        $(document).on('keydown', (e) => {
            if (e.keyCode  === 27 && $('.v-modal').length > 0 && this.data.esc != false) {
                this.closeModal();
            }
        });
    }
    // закрыть функция
    closeModal() {
        if($(".v-modal").last().data('id') == this.modal.data('id')){
            if(this.data.eventCloseModal!=''){
                this.data.eventCloseModal(this);
            }
            this.modal.removeClass('open').find('.container-body').on('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend webkitAnimationEnd oanimationend msAnimationEnd animationend', function(e) {
                this.closest('.v-modal').remove();
                if ($('.v-modal.open').length == 0) {
                    $('body').removeClass('no-scroll');
                }
            });
        }
    }
}
