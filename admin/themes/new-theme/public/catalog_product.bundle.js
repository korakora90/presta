(()=>{"use strict";var e={r:e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}},i={};e.r(i);
/**
 * Copyright since 2007 PrestaShop SA and Contributors
 * PrestaShop is an International Registered Trademark & Property of PrestaShop SA
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Open Software License (OSL 3.0)
 * that is bundled with this package in the file LICENSE.md.
 * It is also available through the world-wide-web at this URL:
 * https://opensource.org/licenses/OSL-3.0
 * If you did not receive a copy of the license and are unable to
 * obtain it through the world-wide-web, please send an email
 * to license@prestashop.com so we can send you a copy immediately.
 *
 * DISCLAIMER
 *
 * Do not edit or add to this file if you wish to upgrade PrestaShop to newer
 * versions in the future. If you wish to customize PrestaShop for your
 * needs please refer to https://devdocs.prestashop.com/ for more information.
 *
 * @author    PrestaShop SA and Contributors <contact@prestashop.com>
 * @copyright Since 2007 PrestaShop SA and Contributors
 * @license   https://opensource.org/licenses/OSL-3.0 Open Software License (OSL 3.0)
 */const t="#js-specific-price-list",c="#specific_price_form .js-cancel",r="#specific_price_form",s="#specific_price_form .js-save",o="#js-open-create-specific-price-form",d=e=>`${e}leave_bprice`,a=e=>`${e}sp_reduction_type`,l="#form_modal_cancel",n="#form_modal_cancel",p="#form_modal_save",{$:f}=window;const m=class{constructor(){this.prefixCreateForm="form_step2_specific_price_",this.prefixEditForm="form_modal_",this.editModalIsOpen=!1,this.$createPriceFormDefaultValues={},this.storePriceFormDefaultValues(),this.loadAndDisplayExistingSpecificPricesList(),this.configureAddPriceFormBehavior(),this.configureEditPriceModalBehavior(),this.configureDeletePriceButtonsBehavior(),this.configureMultipleModalsBehavior()}loadAndDisplayExistingSpecificPricesList(){const e=f(t),i=e.data("listingUrl").replace(/list\/\d+/,`list/${this.getProductId()}`);f.ajax({type:"GET",url:i}).done((i=>{const t=e.find("tbody");t.find("tr").remove(),i.length>0?e.removeClass("hide"):e.addClass("hide");const c=this.renderSpecificPricesListingAsHtml(i);t.append(c)}))}renderSpecificPricesListingAsHtml(e){let i="";const t=f("#js-specific-price-list"),c=this;return f.each(e,((e,r)=>{const s=t.attr("data-action-delete");let o;if(s){const e=s.replace(/delete\/\d+/,`delete/${r.id_specific_price}`);o=c.renderSpecificPriceRow(r,e)}i+=o})),i}renderSpecificPriceRow(e,i){const t=e.id_specific_price,c=e.can_delete?`<a href="${i}" class="js-delete delete btn tooltip-link delete pl-0 pr-0"><i class="material-icons">delete</i></a>`:"",r=e.can_edit?`<a href="#" data-specific-price-id="${t}" class="js-edit edit btn tooltip-link delete pl-0 pr-0"><i class="material-icons">edit</i></a>`:"";return`<tr>     <td>${e.id_specific_price}</td>     <td>${e.rule_name}</td>     <td>${e.attributes_name}</td>     <td>${e.currency}</td>     <td>${e.country}</td>     <td>${e.group}</td>     <td>${e.customer}</td>     <td>${e.fixed_price}</td>     <td>${e.impact}</td>     <td>${e.period}</td>     <td>${e.from_quantity}</td>     <td>${c}</td>     <td>${r}</td></tr>`}configureAddPriceFormBehavior(){const e=!0,i=this.getPrefixSelector(e);f(c).click((()=>{this.resetCreatePriceFormDefaultValues(),f(r).collapse("hide")})),f(s).on("click",(()=>this.submitCreatePriceForm())),f(o).on("click",(()=>this.loadAndFillOptionsForSelectCombinationInput(e))),f(d(i)).on("click",(()=>this.enableSpecificPriceFieldIfEligible(e))),f(a(i)).on("change",(()=>this.enableSpecificPriceTaxFieldIfEligible(e)))}configureEditPriceFormInsideModalBehavior(){const e=!1,i=this.getPrefixSelector(e);f(l).click((()=>this.closeEditPriceModalAndRemoveForm())),f(n).click((()=>this.closeEditPriceModalAndRemoveForm())),f(p).click((()=>this.submitEditPriceForm())),this.loadAndFillOptionsForSelectCombinationInput(e),f(d(i)).on("click",(()=>this.enableSpecificPriceFieldIfEligible(e))),f(a).on("change",(()=>this.enableSpecificPriceTaxFieldIfEligible(e))),this.reinitializeDatePickers(),this.initializeLeaveBPriceField(e),this.enableSpecificPriceTaxFieldIfEligible(e)}reinitializeDatePickers(){f(".datepicker input").datetimepicker({format:"YYYY-MM-DD HH:mm:ss",sideBySide:!0,icons:{time:"time",date:"date",up:"up",down:"down"}})}initializeLeaveBPriceField(e){const i=this.getPrefixSelector(e);""!==f(`${i}sp_price`).val()&&(f(`${i}sp_price`).prop("disabled",!1),f(`${i}leave_bprice`).prop("checked",!1))}configureEditPriceModalBehavior(){f(document).on("click","#js-specific-price-list .js-edit",(e=>{e.preventDefault();const i=f(e.currentTarget).data("specificPriceId");this.openEditPriceModalAndLoadForm(i)}))}configureDeletePriceButtonsBehavior(){f(document).on("click","#js-specific-price-list .js-delete",(e=>{e.preventDefault(),this.deleteSpecificPrice(e.currentTarget)}))}configureMultipleModalsBehavior(){f(".modal").on("hidden.bs.modal",(()=>{this.editModalIsOpen&&f("body").addClass("modal-open")}))}submitCreatePriceForm(){const e=f("#specific_price_form").attr("data-action"),i=f("#specific_price_form input, #specific_price_form select, #form_id_product").serialize();f("#specific_price_form .js-save").attr("disabled","disabled"),f.ajax({type:"POST",url:e,data:i}).done((()=>{window.showSuccessMessage(window.translate_javascripts["Form update success"]),this.resetCreatePriceFormDefaultValues(),f("#specific_price_form").collapse("hide"),this.loadAndDisplayExistingSpecificPricesList(),f("#specific_price_form .js-save").removeAttr("disabled")})).fail((e=>{window.showErrorMessage(e.responseJSON),f("#specific_price_form .js-save").removeAttr("disabled")}))}submitEditPriceForm(){const e=f("#edit-specific-price-modal-form").attr("data-action"),i=f("#edit-specific-price-modal-form").data("specificPriceId"),t=e.replace(/update\/\d+/,`update/${i}`),c=f("#edit-specific-price-modal-form input, #edit-specific-price-modal-form select, #form_id_product").serialize();f("#edit-specific-price-modal-form .js-save").attr("disabled","disabled"),f.ajax({type:"POST",url:t,data:c}).done((()=>{window.showSuccessMessage(window.translate_javascripts["Form update success"]),this.closeEditPriceModalAndRemoveForm(),this.loadAndDisplayExistingSpecificPricesList(),f("#edit-specific-price-modal-form .js-save").removeAttr("disabled")})).fail((e=>{window.showErrorMessage(e.responseJSON),f("#edit-specific-price-modal-form .js-save").removeAttr("disabled")}))}deleteSpecificPrice(e){window.modalConfirmation.create(window.translate_javascripts["Are you sure you want to delete this item?"],null,{onContinue:()=>{const i=f(e).attr("href");f(e).attr("disabled","disabled"),f.ajax({type:"GET",url:i}).done((i=>{this.loadAndDisplayExistingSpecificPricesList(),window.showSuccessMessage(i),f(e).removeAttr("disabled")})).fail((i=>{window.showErrorMessage(i.responseJSON),f(e).removeAttr("disabled")}))}}).show()}storePriceFormDefaultValues(){const e=this.$createPriceFormDefaultValues;f("#specific_price_form").find("select,input").each(((i,t)=>{e[f(t).attr("id")]=f(t).val()})),f("#specific_price_form").find("input:checkbox").each(((i,t)=>{e[f(t).attr("id")]=f(t).prop("checked")})),this.$createPriceFormDefaultValues=e}loadAndFillOptionsForSelectCombinationInput(e){const i=this.getPrefixSelector(e),t=f(`${i}sp_id_product_attribute`),c=t.attr("data-action").replace(/product-combinations\/\d+/,`product-combinations/${this.getProductId()}`);f.ajax({type:"GET",url:c}).done((e=>{t.find("option:gt(0)").remove(),f.each(e,((e,i)=>{t.append(`<option value="${i.id}">${i.name}</option>`)})),"0"!==t.data("selectedAttribute")&&t.val(t.data("selectedAttribute")).trigger("change")}))}enableSpecificPriceTaxFieldIfEligible(e){const i=this.getPrefixSelector(e);"percentage"===f(`${i}sp_reduction_type`).val()?f(`${i}sp_reduction_tax`).hide():f(`${i}sp_reduction_tax`).show()}resetCreatePriceFormDefaultValues(){const e=this.$createPriceFormDefaultValues;f("#specific_price_form").find("input").each(((i,t)=>{f(t).val(e[f(t).attr("id")])})),f("#specific_price_form").find("select").each(((i,t)=>{f(t).val(e[f(t).attr("id")]).change()})),f("#specific_price_form").find("input:checkbox").each(((e,i)=>{f(i).prop("checked",!0)}))}enableSpecificPriceFieldIfEligible(e){const i=this.getPrefixSelector(e);f(`${i}sp_price`).prop("disabled",f(`${i}leave_bprice`).is(":checked")).val("")}openEditPriceModalAndLoadForm(e){const i=f("#js-specific-price-list").data("actionEdit").replace(/form\/\d+/,`form/${e}`);f("#edit-specific-price-modal").modal("show"),this.editModalIsOpen=!0,f.ajax({type:"GET",url:i}).done((i=>{this.insertEditSpecificPriceFormIntoModal(i),f("#edit-specific-price-modal-form").data("specificPriceId",e),this.configureEditPriceFormInsideModalBehavior()})).fail((e=>{window.showErrorMessage(e.responseJSON)}))}closeEditPriceModalAndRemoveForm(){f("#edit-specific-price-modal").modal("hide"),this.editModalIsOpen=!1;f("#edit-specific-price-modal-form").empty()}insertEditSpecificPriceFormIntoModal(e){const i=f("#edit-specific-price-modal-form");i.empty(),i.append(e)}getProductId(){return f("#form_id_product").val()}getPrefixSelector(e){return e?`#${this.prefixCreateForm}`:`#${this.prefixEditForm}`}},{$:u}=window;u((()=>{new m})),window.catalog_product=i})();