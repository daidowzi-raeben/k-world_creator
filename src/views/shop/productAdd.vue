<template>
    <div class="grid" id="submitForm">
        <!-- <div style="overflow: hidden; width: 100%; height: 300px; background: #fff; position: fixed; top: 0; left: 0; z-index: 9999">
            {{ GOODS }}
        </div> -->
        <div class="col-12">
            <div class="card">
                <h4><strong>상품등록</strong></h4>
                <TabMenu :model="tabMenuItems" class="sticky">
                    <template #item="{ item }">
                        <a class="p-menuitem-link" :href="item.to">
                            {{ item.label }}
                        </a>
                    </template>
                </TabMenu>
                <div id="tab1" class="pb-8"></div>
                <div class="pt-8 pb-8">
                    <div class="input-wrap mt-2">
                        <label class="label">상품코드</label>
                        <InputText type="text" placeholder="placeholder" :disabled="true"></InputText>
                    </div>
                    <div class="input-wrap">
                        <label class="label">카테고리</label>
                        <select size="5" v-model="goods.cate1" class="scroll-box">
                            <option class="btn" v-for="(v, i) in MENU_LIST.DEPTH1" :key="i" :value="v?.idx" @click="onClickCategory(2, v?.menu_code)">{{ v?.menu_en }} {{ v?.idx }}</option>
                        </select>
                        <select size="5" v-model="goods.cate2" class="scroll-box">
                            <option class="btn" v-for="(v, i) in MENU_LIST.DEPTH2" :key="i" :value="v?.idx">
                                {{ v?.menu_en }}
                            </option>
                        </select>
                        <!-- <div class="scroll-box" v-for="item in 4" :key="item">
                            <button type="button" class="btn" v-for="item in 20" :key="item">카테고리{{ item }}</button>
                        </div>
                        <div class="ml-4">
                            <Button label="Select" />
                        </div> -->
                    </div>
                    <div class="grid mt-0">
                        <div class="col-5">
                            <div class="input-wrap">
                                <label class="label">노출 여부</label>
                                <div class="field-radiobutton mb-0">
                                    <RadioButton id="option1" name="option" v-model="goods.use_yn" value="Y" />
                                    <label for="option1">Yes</label>
                                </div>
                                <div class="field-radiobutton mb-0">
                                    <RadioButton id="option2" name="option" v-model="goods.use_yn" value="N" />
                                    <label for="option2">No</label>
                                </div>
                            </div>
                        </div>
                        <div class="col-5">
                            <div class="input-wrap">
                                <label class="label ml-8">판매 여부</label>
                                <div class="field-radiobutton mb-0">
                                    <RadioButton id="option3" name="option2" value="Y" v-model="goods.sale_yn" />
                                    <label for="option3">Yes</label>
                                </div>
                                <div class="field-radiobutton mb-0">
                                    <RadioButton id="option4" name="option2" value="N" v-model="goods.sale_yn" />
                                    <label for="option4">No</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="input-wrap">
                        <label class="label">상품 상태</label>
                        <div class="field-checkbox mb-0 mr-3">
                            <Checkbox id="checkOption1" name="option3" value="Y" v-model="goods.hot_yn" />
                            <label for="checkOption1">Hot pick</label>
                        </div>
                        <div class="field-checkbox mb-0">
                            <Checkbox id="checkOption2" name="option4" value="Y" v-model="goods.popular_yn" />
                            <label for="checkOption2">인기상품(검색창)</label>
                        </div>
                    </div>
                </div>
                <hr id="tab2" class="mt-7 mb-7" />
                <div class="pt-8 pb-8">
                    <div class="grid mt-2">
                        <div class="col-5">
                            <div class="input-wrap">
                                <label class="label">브랜드</label>
                                <InputText type="text" v-model="goods.brand.brand_name" placeholder="placeholder"></InputText>
                                <Button label="Search" class="ml-2" @click="onClickBrandLoad(null)" />
                                <Dialog header="브랜드 검색" v-model:visible="searchModal" :modal="true" class="modal-md">
                                    <div class="input-wrap">
                                        <IconField iconPosition="left">
                                            <InputText type="text" v-model="search.brand" />
                                            <InputIcon class="pi pi-search" />
                                        </IconField>
                                        <Button label="Search" class="ml-2" :disabled="search.brand ? false : true" @click="onClickBrandLoad(search.brand)" />
                                    </div>
                                    <div class="table-wrap scroll mt-4">
                                        <table class="table">
                                            <tr>
                                                <th class="text-left">브랜드명</th>
                                            </tr>
                                            <tr v-for="(v, i) in BRAND_LIST" :key="i">
                                                <td class="text-left">
                                                    <button
                                                        class="btn"
                                                        @click="
                                                            () => {
                                                                goods.brand = v;
                                                                searchModal = false;
                                                            }
                                                        "
                                                    >
                                                        {{ v?.brand_name }}
                                                    </button>
                                                </td>
                                            </tr>
                                        </table>
                                    </div>
                                </Dialog>
                            </div>
                        </div>
                    </div>
                    <div class="grid">
                        <div class="col-12 md:col-5">
                            <div class="input-wrap">
                                <label class="label">상품명</label>
                                <InputText type="text" v-model="goods.goods_name" placeholder="placeholder" class="wd-100"></InputText>
                            </div>
                        </div>
                    </div>
                    <div class="grid">
                        <div class="col-12 md:col-5">
                            <div class="input-wrap">
                                <label class="label">검색키워드</label>
                                <InputText type="text" v-model="goods.goods_tag" placeholder="placeholder" class="wd-100"></InputText>
                            </div>
                            <div class="input-wrap mt-1">
                                <label class="label"></label>
                                *상품명은 자동으로 등록되며 키워드는 콤마(,)로 구분할 수 있습니다.
                            </div>
                        </div>
                    </div>
                    <div class="grid">
                        <div class="col-12 md:col-5">
                            <div class="input-wrap">
                                <label class="label">상품태그</label>
                                <InputText type="text" v-model="goods.goods_shop" placeholder="placeholder" class="wd-100"></InputText>
                            </div>
                            <div class="input-wrap mt-1">
                                <label class="label"></label>
                                #으로 구분합니다
                            </div>
                        </div>
                    </div>
                    <div class="grid">
                        <div class="col-12 md:col-5">
                            <div class="input-wrap">
                                <label class="label">리워드 텍스트</label>
                                <InputText type="text" v-model="goods.reward_text" placeholder="placeholder" class="wd-100"></InputText>
                            </div>
                            <div class="input-wrap mt-1">
                                <label class="label"></label>
                            </div>
                        </div>
                    </div>
                    <div class="input-wrap mt-0">
                        <label class="label">상품노출시간</label>
                        <Calendar :showIcon="true" :showButtonBar="true" v-model="goods.use_datetime" dateFormat="yy/mm/dd" placeholder="yyyy/mm/dd" showTime></Calendar>
                        {{ goods.use_datetime }}
                    </div>
                    <!-- <div class="grid mt-0">
                        <div class="col-12">
                            <div class="input-wrap">
                                <label class="label">상품대표색상</label>
                                <div class="color-wrap" v-for="(v, i) in GOODS.COLOR" :key="i">
                                    <label class="color-check">
                                        <input type="checkbox" :id="`color${i}`" name="goddsColor" :value="i" @click="onClickColorSelected(null)" />
                                        <span class="color" :style="'background-color:' + v.color"></span>
                                    </label>
                                </div>
                            </div>
                            <div class="input-wrap mt-3">
                                <label class="label">선택된 색상</label>
                                <div class="color-wrap" v-for="(v, i) in goods.color" :key="i">
                                    <label class="color-check">
                                        <input type="checkbox" disabled />
                                        <span class="color" :style="'background-color:' + v.color"></span>
                                    </label>
                                    <button type="button" :for="`color${i}`" class="btn" @click="onClickColorSelected(v?.sort)">&times;</button>
                                </div>
                            </div>
                        </div>
                    </div> -->
                </div>
                <hr id="tab3" class="mt-7 mb-7" />
                <div class="pt-8 pb-8">
                    <!-- {{ goods.info }} -->
                    <div class="grid mt-2" v-for="(v, i) in goods.info" :key="i">
                        <div class="col-5">
                            <div class="input-wrap">
                                <label class="label">{{ v.title }}</label>
                                <InputText type="text" v-model="goods.info[i].value" placeholder="placeholder" class="wd-100"></InputText>
                            </div>
                        </div>
                    </div>
                    <!--
                    <div class="grid">
                        <div class="col-5">
                            <div class="input-wrap">
                                <label class="label">Additional<br />Information</label>
                                <InputText type="text" v-model="goods.info[0].value" placeholder="placeholder" class="wd-100"></InputText>
                            </div>
                        </div>
                         <div class="col-5">
                            <div class="input-wrap">
                                <label class="label">유통기한</label>
                                <InputText type="text" placeholder="placeholder" class="wd-100"></InputText>
                            </div>
                        </div>
                    </div>
                    <div class="grid">
                        <div class="col-5">
                            <div class="input-wrap">
                                <label class="label">제조일</label>
                                <InputText type="text" placeholder="placeholder" class="wd-100"></InputText>
                            </div>
                        </div>
                        <div class="col-5">
                            <div class="input-wrap">
                                <label class="label">출시일</label>
                                <InputText type="text" placeholder="placeholder" class="wd-100"></InputText>
                            </div>
                        </div> 
                    </div>-->
                    <!-- <div class="input-wrap mt-0">
                        <label class="label">추가항목</label>
                        <Button label="Add" />
                        <span class="ml-2">※ 상품 특성에 맞게 항목을 추가할 수 있습니다. (예. 감독, 저자, 출판사, 유통사, 상품영문명 등)</span>
                    </div>
                    <div class="grid mt-0">
                        <div class="col-10">
                            <div class="input-wrap">
                                <label class="label"></label>
                                <div class="table-wrap">
                                    <table class="table">
                                        <tr>
                                            <th>순서</th>
                                            <th>내용</th>
                                            <th>항목</th>
                                            <th>삭제</th>
                                        </tr>
                                        <tr v-for="item in 3" :key="item">
                                            <td>{{ item }}</td>
                                            <td>
                                                <InputText type="text" placeholder="placeholder" class="wd-100"></InputText>
                                            </td>
                                            <td>
                                                <InputText type="text" placeholder="placeholder" class="wd-100"></InputText>
                                            </td>
                                            <td><Button label="Delete" severity="danger" /></td>
                                        </tr>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div> -->
                </div>
                <hr id="tab4" class="mt-7 mb-7" />
                <div class="pt-8 pb-8">
                    <div class="grid mt-2">
                        <div class="col-5">
                            <div class="input-wrap">
                                <label class="label">품절 상태</label>
                                <div class="field-radiobutton mb-0">
                                    <RadioButton id="soldOut" name="soldOut" value="1" v-model="soldout_yn" />
                                    <label for="soldOut">정상</label>
                                </div>
                                <div class="field-radiobutton mb-0">
                                    <RadioButton id="soldOut2" name="soldOut" value="2" v-model="soldout_yn" />
                                    <label for="soldOut2">품절(수동)</label>
                                </div>
                            </div>
                            <!-- <div class="input-wrap">
                                <label class="label">판매 재고</label>
                                <div class="field-radiobutton mb-0">
                                    <RadioButton id="sale" name="sale" value="1" v-model="radioValueSale" />
                                    <label for="sale">무한정 판매</label>
                                </div>
                                <div class="field-radiobutton mb-0">
                                    <RadioButton id="sale2" name="sale" value="2" v-model="radioValueSale" />
                                    <label for="sale2">재고량에 따름</label>
                                </div>
                            </div> -->
                        </div>
                        <div class="col-5">
                            <div class="input-wrap">
                                <label class="label">상품 재고</label>
                                <InputText type="text" class="mr-2 wd-sm" v-model="goods.goods_inven"></InputText>개
                            </div>
                        </div>
                    </div>
                    <!-- <div class="grid">
                        <div class="col-5">
                            <div class="input-wrap">
                                <label class="label">묶음주문 단위</label>
                                <Dropdown v-model="dropdownValue" :options="dropdownValues" optionLabel="name" placeholder="Select" />
                                <InputText type="text" class="mr-2 ml-2 wd-sm"></InputText>개 단위로 주문 및 장바구니에 담김
                            </div>
                        </div>
                        <div class="col-5">
                            <div class="input-wrap">
                                <label class="label">품절 상태</label>
                                <div class="field-radiobutton mb-0">
                                    <RadioButton id="soldOut" name="soldOut" value="1" v-model="soldout_yn" />
                                    <label for="soldOut">정상</label>
                                </div>
                                <div class="field-radiobutton mb-0">
                                    <RadioButton id="soldOut2" name="soldOut" value="2" v-model="soldout_yn" />
                                    <label for="soldOut2">품절(수동)</label>
                                </div>
                            </div>
                        </div>
                    </div> -->
                    <!-- <div class="input-wrap mt-0">
                        <label class="label">구매수량 설정</label>
                        <div class="field-radiobutton mb-0">
                            <RadioButton id="saleQuantity" name="saleQuantity" value="1" v-model="radioValueSaleQuantity" />
                            <label for="saleQuantity">제한없음</label>
                        </div>
                        <div class="field-radiobutton mb-0">
                            <RadioButton id="saleQuantity2" name="saleQuantity" value="2" v-model="radioValueSaleQuantity" />
                            <label for="saleQuantity2">
                                <Dropdown v-model="dropdownValue" :options="dropdownValues" optionLabel="name" placeholder="Select" :disabled="radioValueSaleQuantity == '1'" />
                                <span class="ml-2">최소 구매 수량 : </span>
                                <InputText type="text" class="wd-sm" :disabled="radioValueSaleQuantity == '1'"></InputText>
                                <span class="ml-2">개 / 최대 구매 수량 : </span>
                                <InputText type="text" class="wd-sm" :disabled="radioValueSaleQuantity == '1'"></InputText>
                                <span class="ml-2">개</span>
                            </label>
                        </div>
                    </div> -->
                    <!-- <div class="input-wrap">
                        <label class="label">판매기간</label>
                        <div class="field-radiobutton mb-0">
                            <RadioButton id="salePeriod" name="salePeriod" value="1" v-model="radioValueSalePeriod" />
                            <label for="salePeriod">제한없음</label>
                        </div>
                        <div class="field-radiobutton mb-0">
                            <RadioButton id="salePeriod2" name="salePeriod" value="2" v-model="radioValueSalePeriod" />
                            <label for="salePeriod2">
                                <span class="mr-2">시작일 / 종료일</span>
                                <Calendar :showIcon="true" selectionMode="range" :showButtonBar="true" v-model="calendarValue" :disabled="radioValueSalePeriod == '1'"></Calendar>
                                <span class="ml-2 mr-2">~</span>
                                <Calendar :showIcon="true" :showButtonBar="true" v-model="calendarValue" :disabled="radioValueSalePeriod == '1'"></Calendar>
                            </label>
                        </div>
                    </div> -->
                    <!-- <div class="input-wrap">
                        <label class="label">재입고 알림</label>
                        <div class="field-checkbox mb-0">
                            <Checkbox id="restock" name="restock" value="Yes" v-model="checkboxValueRestock" />
                            <label for="restock">상품 재입고 알림 사용</label>
                        </div>
                    </div> -->
                </div>
                <hr id="tab5" class="mt-7 mb-7" />
                <div class="pt-8 pb-8">
                    <div class="grid mt-2">
                        <div class="col-5">
                            <div class="input-wrap">
                                <label class="label">정가</label>
                                <InputText type="text" v-model="goods.goods_price" placeholder="placeholder"></InputText>
                            </div>
                        </div>
                        <div class="col-5">
                            <div class="input-wrap">
                                <label class="label">판매가</label>
                                <InputText type="text" v-model="goods.goods_amt" placeholder="placeholder"></InputText>
                                <strong class="ml-2">0.0% DC</strong>
                            </div>
                        </div>
                    </div>
                    <div class="grid">
                        <div class="col-5">
                            <div class="input-wrap">
                                <label class="label">타임딜</label>
                                <div class="field-checkbox mb-0">
                                    <Checkbox id="timedeal" name="timedeal" value="Yes" v-model="goods.time_yn" />
                                    <label for="timedeal">Yes</label>
                                </div>
                            </div>
                            <div class="input-wrap mt-0">
                                <label class="label"></label>
                                <p>
                                    * time deal 은 상품 노출시간으로부터 24시간동안 적용됩니다.<br />
                                    * 이미 노출된 상품은 타임딜이 불가합니다.
                                </p>
                            </div>
                        </div>
                        <div class="col-5">
                            <div class="input-wrap">
                                <label class="label">타임딜 판매가</label>
                                <InputText type="text" placeholder="placeholder" v-model="goods.time_amt" :disabled="goods.time_yn != 'Yes'"></InputText>
                                <strong class="ml-2">0.0% DC</strong>
                            </div>
                        </div>
                    </div>
                    <div class="grid">
                        <div class="col-5">
                            <div class="input-wrap">
                                <label class="label">리워드 포인트</label>
                                <div class="field-checkbox mb-0">
                                    <InputText type="text" placeholder="placeholder" v-model="goods.point_amt"></InputText>
                                </div>
                            </div>
                            <!-- <div class="input-wrap mt-0">
                                <label class="label"></label>
                                <p>
                                    * time deal 은 상품 노출시간으로부터 24시간동안 적용됩니다.<br />
                                    * 이미 노출된 상품은 타임딜이 불가합니다.
                                </p>
                            </div> -->
                        </div>
                        <div class="col-5">
                            <div class="input-wrap">
                                <label class="label">크리에이터 정산</label>
                                <InputText type="text" placeholder="placeholder" v-model="goods.creator_amt"></InputText>
                            </div>
                        </div>
                    </div>
                    <div class="grid">
                        <div class="col-5">
                            <div class="input-wrap">
                                <label class="label">추가배송비</label>
                                <div class="field-checkbox mb-0">
                                    <InputText type="text" placeholder="placeholder" v-model="goods.amt_ship_cost_add"></InputText>
                                </div>
                            </div>
                            <!-- <div class="input-wrap mt-0">
                                <label class="label"></label>
                                <p>
                                    * time deal 은 상품 노출시간으로부터 24시간동안 적용됩니다.<br />
                                    * 이미 노출된 상품은 타임딜이 불가합니다.
                                </p>
                            </div> -->
                        </div>
                        <!-- <div class="col-5">
                            <div class="input-wrap">
                                <label class="label">크리에이터 정산</label>
                                <InputText type="text" placeholder="placeholder" v-model="goods.creator_amt"></InputText>
                            </div>
                        </div> -->
                    </div>
                </div>
                <hr id="tab6" class="mt-7 mb-7" />
                <div class="pt-8 pb-8">
                    <div class="input-wrap mt-2">
                        <label class="label">옵션사용</label>
                        <div class="field-radiobutton mb-0">
                            <RadioButton id="option5" name="option5" value="Yes" v-model="radioValue3" />
                            <label for="option5">Yes</label>
                        </div>
                        <div class="field-radiobutton mb-0">
                            <RadioButton id="option6" name="option5" value="No" v-model="radioValue3" />
                            <label for="option6">No</label>
                        </div>
                    </div>
                    <div class="input-wrap">
                        <label class="label">옵션설정</label>
                        <Button :label="`옵션수정(${GOODS.OPTIONS.cnt}개)`" @click="optionAddModal = true" />
                        <Dialog header="옵션등록" v-model:visible="optionAddModal" :modal="true">
                            <!-- {{ options }} -->
                            <Button label="추가하기" @click="options.cnt++" />
                            <div class="table-wrap mt-4">
                                <table class="table">
                                    <tr>
                                        <th>옵션명</th>
                                        <th>옵션설명</th>
                                        <th>가격</th>
                                        <!-- <th>이미지</th> -->
                                        <th></th>
                                    </tr>

                                    <tr v-for="item in options.cnt" :key="item">
                                        <td>
                                            <InputText type="text" placeholder="placeholder" v-model="options.option_title[item - 1]"></InputText>
                                        </td>
                                        <td>
                                            <InputText type="text" placeholder="placeholder" v-model="options.option_value[item - 1]"></InputText>
                                        </td>
                                        <td>
                                            <InputText type="text" placeholder="placeholder" v-model="options.option_amt[item - 1]"></InputText>
                                        </td>
                                        <!-- <td>
                                            <FileUpload mode="basic" name="demo[]" accept="image/*" :maxFileSize="1000000" @uploader="onUploadOption($event, [item - 1])" :auto="true" customUpload />
                                        </td> -->
                                        <td>
                                            <Button label="삭제" severity="danger" @click="onClickOptionsDelete(item - 1)" />
                                        </td>
                                    </tr>
                                    <tr v-for="item in GOODS.OPTIONS.cnt" :key="item">
                                        <td>
                                            {{ GOODS.OPTIONS?.option_title[item - 1] }}<br />
                                            <!-- <span class="text-grey">CP00001</span> -->
                                        </td>
                                        <td>{{ GOODS.OPTIONS?.option_value[item - 1] }}</td>
                                        <td>${{ GOODS.OPTIONS?.option_amt[item - 1] }}</td>
                                        <!-- <td>
                                            <img class="thumb-img" :src="GOODS.OPTIONS?.img[item - 1]?.objectURL" />
                                        </td> -->
                                        <td>
                                            <Button label="삭제" severity="danger" @click="onClickOptionsDelete(i)" />
                                        </td>
                                    </tr>
                                </table>
                            </div>
                            <template #footer>
                                <Button label="저장하기" @click="onClickOptionSave" icon="pi pi-check" class="p-button-outlined" />
                            </template>
                        </Dialog>
                    </div>
                </div>
                <hr id="tab7" class="mt-7 mb-7" />
                <div class="pt-8 pb-8">
                    <div class="flex">
                        <div class="field-radiobutton mb-0">
                            <RadioButton id="uploadMethodImage" name="uploadMethod" value="image" v-model="radioValueUploadMethod" />
                            <label for="uploadMethodImage">이미지 업로드</label>
                        </div>
                        <div class="field-radiobutton mb-0">
                            <RadioButton id="uploadMethodUrl" name="uploadMethod" value="url" v-model="radioValueUploadMethod" />
                            <label for="uploadMethodUrl">URL 등록</label>
                        </div>
                    </div>

                    <template v-if="radioValueUploadMethod == 'image'">
                        <div class="input-wrap mt-4">
                            <label class="label">원본이미지</label>
                            <div class="upload-custom">
                                <FileUpload name="demo[]" mode="basic" :auto="true" @uploader="onUploadO($event)" :multiple="false" accept="image/*" :maxFileSize="1000000" customUpload />
                                <div style="margin-top: 10px">
                                    <img v-for="(v, i) in GOODS.THUMB.O" :key="i" :src="v?.objectURL" style="width: 100px; height: 100px" />
                                    <template v-if="GOODS.THUMB.O.length === 0 && this.goods?.img_list?.length > 0">
                                        <template v-for="(v, i) in this.goods?.img_list" :key="i">
                                            <img v-if="v?.img_code === 'O'" :src="v?.img_url" style="width: 100px; height: 100px" />
                                        </template>
                                    </template>
                                </div>
                            </div>
                        </div>
                        <div class="input-wrap">
                            <label class="label">상세 이미지</label>
                            <div class="upload-custom">
                                <FileUpload name="demo[]" mode="basic" :auto="true" @uploader="onUploadD($event)" :multiple="true" accept="image/*" :maxFileSize="1000000" customUpload />
                                <div style="margin-top: 10px">
                                    <img v-for="(v, i) in GOODS.THUMB.D" :key="i" :src="v?.objectURL" style="width: 100px; height: 100px" />
                                    <template v-if="GOODS.THUMB.D.length === 0 && this.goods?.img_list?.length > 0">
                                        <template v-for="(v, i) in this.goods?.img_list" :key="i">
                                            <img v-if="v?.img_code === 'D'" :src="v?.img_url" style="width: 100px; height: 100px" />
                                        </template>
                                    </template>
                                </div>
                            </div>
                        </div>
                        <div class="input-wrap mt-1">
                            <label class="label"></label>
                            <!-- <div class="field-checkbox mb-0">
                                <Checkbox id="original" name="original" value="original" v-model="checkboxValue" />
                                <label for="original" class="white-space-nowrap">원본이미지로 사용</label>
                            </div> -->
                        </div>
                        <div class="input-wrap">
                            <label class="label">썸네일이미지</label>
                            <div class="upload-custom">
                                <FileUpload name="demo[]" mode="basic" :auto="true" @uploader="onUploadT($event)" :multiple="false" accept="image/*" :maxFileSize="1000000" customUpload />
                                <div style="margin-top: 10px">
                                    <img v-for="(v, i) in GOODS.THUMB.T" :key="i" :src="v?.objectURL" style="width: 100px; height: 100px" />
                                    <template v-if="GOODS.THUMB.T.length === 0 && this.goods?.img_list?.length > 0">
                                        <template v-for="(v, i) in this.goods?.img_list" :key="i">
                                            <img v-if="v?.img_code === 'T'" :src="v?.img_url" style="width: 100px; height: 100px" />
                                        </template>
                                    </template>
                                </div>
                            </div>
                        </div>
                        <div class="input-wrap mt-1">
                            <label class="label"></label>
                            <!-- <div class="field-checkbox mb-0">
                                <Checkbox id="original2" name="original2" value="original2" v-model="checkboxValue" />
                                <label for="original2" class="white-space-nowrap">원본이미지로 사용</label>
                            </div> -->
                        </div>
                    </template>
                    <template v-else-if="radioValueUploadMethod == 'url'">
                        <div class="grid mt-2">
                            <div class="col-10">
                                <div class="input-wrap">
                                    <label class="label">원본이미지</label>
                                    <InputText type="text" placeholder="placeholder" class="wd-100"></InputText>
                                </div>
                            </div>
                        </div>
                        <div class="grid">
                            <div class="col-10">
                                <div class="input-wrap">
                                    <label class="label">확대이미지</label>
                                    <InputText type="text" placeholder="placeholder" class="wd-100"></InputText>
                                </div>
                            </div>
                        </div>
                        <div class="grid">
                            <div class="col-10">
                                <div class="input-wrap">
                                    <label class="label">썸네일이미지</label>
                                    <InputText type="text" placeholder="placeholder" class="wd-100"></InputText>
                                </div>
                            </div>
                        </div>
                    </template>
                </div>
                <hr id="tab8" class="mt-7 mb-7" />
                <div class="pt-8 pb-4">
                    <div class="grid mt-2">
                        <div class="col-10">
                            <div class="input-wrap">
                                <label class="label">짧은설명</label>
                                <InputText type="text" placeholder="placeholder" class="wd-100"></InputText>
                            </div>
                        </div>
                    </div>
                    <div class="grid">
                        <div class="col-10">
                            <div class="input-wrap">
                                <label class="label">상세설명</label>
                                <vue-editor v-model="goods.detailContent" class="wd-100"></vue-editor>
                            </div>
                        </div>
                    </div>
                    <div class="grid">
                        <div class="col-10">
                            <div class="input-wrap">
                                <label class="label">배송안내</label>
                                <vue-editor v-model="goods.term.delivery" class="wd-100"></vue-editor>
                            </div>
                        </div>
                    </div>
                    <div class="grid">
                        <div class="col-10">
                            <div class="input-wrap">
                                <label class="label">AS안내</label>
                                <vue-editor v-model="goods.term.as" class="wd-100"></vue-editor>
                            </div>
                        </div>
                    </div>
                    <div class="grid">
                        <div class="col-10">
                            <div class="input-wrap">
                                <label class="label">환불안내</label>
                                <vue-editor v-model="goods.term.refund" class="wd-100"></vue-editor>
                            </div>
                        </div>
                    </div>
                    <div class="grid">
                        <div class="col-10">
                            <div class="input-wrap">
                                <label class="label">교환안내</label>
                                <vue-editor v-model="goods.term.exchange" class="wd-100"></vue-editor>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="btn-wrap mt-0">
                    <Button label="등록" class="lg" @click="onClickSubmit" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue';
import { VueEditor } from 'vue3-editor';
import { useToast } from 'primevue/usetoast';
import { mapState, mapActions, mapMutations } from 'vuex';

export default {
    data() {
        return {
            search: {
                brand: ''
            },
            options: {
                cnt: 1,
                option_title: [],
                option_amt: [],
                option_inven: [],
                option_value: [],
                img: []
            },
            goods_data: {},
            goods: {
                detailContent: '',
                goods_inven: '9999',
                reward_text: '',
                goods_name: '',
                goods_tag: '',
                goods_shop: '',
                use_yn: 'Y',
                sale_yn: 'Y',
                hot_yn: ['Y'],
                popular_yn: ['Y'],
                brand: {
                    brand_name: ''
                },
                use_datetime: '',
                term: {
                    delivery: '',
                    as: '',
                    exchange: '',
                    refund: ''
                },
                color: [],
                info: [
                    { title: 'Manufacturer', value: '' },
                    { title: 'Dimensions', value: '' },
                    { title: 'Weight', value: '' },
                    { title: 'Material', value: '' },
                    { title: 'Color', value: '' },
                    { title: 'Ingredients', value: '' },
                    { title: 'Number', value: '' },
                    { title: 'Additional', value: '' }
                ],

                goods_price: '0',
                goods_amt: '0',
                time_yn: '',
                time_amt: '0',
                point_amt: '0',
                amt_ship_cost_add: '0',
                creator_amt: '0'
            },
            dropdownValues: ref([
                { name: 'select1', code: '1' },
                { name: 'select2', code: '2' },
                { name: 'select3', code: '3' }
            ]),
            dropdownValue: ref(null),
            radioValue: 'Yes',
            radioValue2: 'Yes',
            radioValue3: 'Yes',
            radioValueSale: '1',
            checkboxValue: '',
            checkboxValue2: '',
            calendarValue: '',
            colorValue: '#000000',
            content2: '',
            content3: '',
            content4: '',
            content5: '',
            point_amt: '',
            time_amt: '',
            test: null,
            toast: useToast(),
            time_yn: '',
            soldout_yn: '1',
            radioValueSaleQuantity: '1',
            radioValueSalePeriod: '1',
            checkboxValueRestock: '',
            searchModal: false,
            optionAddModal: false,
            tabMenuItems: ref([
                {
                    label: '노출정보',
                    to: '#tab1'
                },
                {
                    label: '기본정보',
                    to: '#tab2'
                },
                {
                    label: '추가정보',
                    to: '#tab3'
                },
                {
                    label: '판매정보',
                    to: '#tab4'
                },
                {
                    label: '할인/혜택',
                    to: '#tab5'
                },
                {
                    label: '옵션설정',
                    to: '#tab6'
                },
                {
                    label: '이미지',
                    to: '#tab7'
                },
                {
                    label: '상세정보',
                    to: '#tab8'
                }
            ]),
            radioValueUploadMethod: 'image'
        };
    },
    watch: {
        'GOODS.TERM': {
            handler(v) {
                this.goods.term = {
                    delivery: v?.delivery?.content,
                    as: v?.as?.content,
                    exchange: v?.exchange?.content,
                    refund: v?.refund?.content
                };
            },
            deep: true,
            immediate: true
        },
        'GOODS.DETAIL': {
            handler(v) {
                setTimeout(() => {
                    console.log(v?.data);
                    if (v?.data?.idx) {
                        const data = JSON.stringify(this.GOODS.DETAIL?.data);
                        this.goods = JSON.parse(data);

                        this.goods.brand = {
                            brand_name: this.goods.brand_name
                        };
                        this.goods.term = {
                            delivery: this.goods.goods_delivery,
                            as: this.goods.goods_as,
                            exchange: this.goods.goods_exchange,
                            refund: this.goods.goods_refund
                        };
                        this.options.cnt = this.goods.option_list.length;
                        this.goods.option_list.forEach((e, i) => {
                            this.options.option_title[i] = e.option_title;
                            this.options.option_amt[i] = e.option_amt;
                            this.options.option_value[i] = e.option_value;
                            this.options.option_inven[i] = e.option_inven;
                        });
                        // this.content = this.goods.detailContent;
                        this.goods.info = [
                            { title: 'Manufacturer', value: '' },
                            { title: 'Dimensions', value: '' },
                            { title: 'Weight', value: '' },
                            { title: 'Material', value: '' },
                            { title: 'Color', value: '' },
                            { title: 'Ingredients', value: '' },
                            { title: 'Number', value: '' },
                            { title: 'Additional', value: '' }
                        ];

                        this.goods.info_list.forEach((v) => {
                            this.goods.info.forEach((e) => {
                                if (v?.info_title === e?.title) {
                                    e.value = v.info_memo;
                                }
                            });
                        });
                        this.onClickOptionSave();

                        this.onClickCategory(2, this.goods.cate_parent_idx);
                    }
                    // this.goods.cate_parent_idx = this.goods_data.cate_parent_idx;
                    // this.goods.cate_idx = this.goods_data.cate_idx;

                    // this.goods.info = [
                    //     { title: 'Manufacturer', value: '' },
                    //     { title: 'Dimensions', value: '' },
                    //     { title: 'Weight', value: '' },
                    //     { title: 'Material', value: '' },
                    //     { title: 'Color', value: '' },
                    //     { title: 'Ingredients', value: '' },
                    //     { title: 'Number', value: '' },
                    //     { title: 'Additional', value: '' }
                    // ];
                }, 100);
            },
            deep: true,
            immediate: true
        }
    },
    computed: {
        ...mapState(['MENU_LIST', 'BRAND_LIST', 'GOODS'])
    },

    components: {
        VueEditor
    },
    created() {},
    mounted() {
        // 1뎁스 카테고리 출력
        this.onClickCategory(1);

        // term 정보 추출
        this.ACTION_TERM_GOODS({ mode: 'goods_once' });

        // color 정보 추출
        // this.ACTION_COLOR_LIST({ mode: 'color' });

        if (this.$route?.query?.code) {
            this.ACTION_GOODS_DETAIL({ mode: 'detail', goods: this.$route?.query?.code });
        }
    },
    methods: {
        ...mapMutations(['MUTATION_OPTIONS_DATA', 'MUTATION_MENU_LIST', 'MUTATION_OPTIONS_LIST', 'MUTATION_THUMB_O', 'MUTATION_THUMB_T', 'MUTATION_THUMB_D']),
        ...mapActions(['ACTION_GOODS_DETAIL', 'ACTION_GOODS_INSERT', 'ACTION_MENU_LIST', 'ACTION_BRAND_LIST', 'ACTION_TERM_GOODS', 'ACTION_COLOR_LIST']),
        onUpload: () => {
            this.toast.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded', life: 3000 });
        },
        onUploadOption(v, i) {
            // this.toast.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded', life: 3000 });
            console.log(v?.files[0]?.objectURL);
            this.options.img[i] = v?.files[0];
            // this.options.img = { aa: 1 };
        },
        onUploadO(v, i) {
            // this.toast.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded', life: 3000 });
            console.log(v?.files[0]?.objectURL);
            this.MUTATION_THUMB_O(v?.files[0]);
            // this.options.img = { aa: 1 };
        },
        onUploadD(v, i) {
            // this.toast.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded', life: 3000 });
            console.log(v?.files[0]?.objectURL);
            this.MUTATION_THUMB_D(v?.files[0]);
            // this.options.img = { aa: 1 };
        },
        onUploadT(v, i) {
            // this.toast.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded', life: 3000 });
            console.log(v?.files[0]?.objectURL);
            this.MUTATION_THUMB_T(v?.files[0]);
            // this.options.img = { aa: 1 };
        },
        onClickOptionSave() {
            for (let i = 0; i < this.options.cnt; i++) {
                if (!this.options.option_title[i] || !this.options.option_amt[i] || !this.options.option_value[i]) {
                    alert('모든 항목을 입력하세요');
                    return;
                }
            }
            let data = JSON.stringify(this.options);
            data = JSON.parse(data);
            data.img = this.options.img;
            console.log('==============================');
            this.MUTATION_OPTIONS_LIST(data);
        },
        onClickOptionsDelete(index) {
            console.log(index);
            const option_title = [];
            const option_value = [];
            const option_amt = [];
            const img = [];
            this.options.option_title.forEach((v, i) => {
                if (i != index) {
                    option_title.push(v);
                    option_value.push(this.options.option_value[i]);
                    option_amt.push(this.options.option_amt[i]);
                    img.push(this.options.img[i]);
                }
            });
            this.options.option_title = option_title;
            this.options.option_value = option_value;
            this.options.option_amt = option_amt;
            this.options.img = img;
            this.options.cnt = this.options.option_title.length;
        },
        onLoadSearch() {},
        onClickCategory(depth, parentCode) {
            let param = { mode: 'depth', depth: depth };
            if (parentCode) param = { mode: 'depth', depth: depth, parentCode: parentCode };
            this.ACTION_MENU_LIST(param);
        },
        async onClickBrandLoad(brand) {
            console.log('brand', brand);
            let params = { mode: 'brand' };
            if (brand) params = { mode: 'brand', brand: brand };
            await this.ACTION_BRAND_LIST(params);
            this.searchModal = true;
        },
        onClickColorSelected(idx) {
            this.goods.color = [];
            const list = document.getElementsByName('goddsColor');
            if (idx !== null) {
                console.log(`color${idx}`, $(`input[id=color${idx}]`));
                $(`input[id=color${idx}]`).prop('checked', false);
            }
            list.forEach((v, i) => {
                if (v.checked) {
                    this.goods.color.push({
                        color: this.GOODS.COLOR[i]?.color,
                        idx: this.GOODS.COLOR[i]?.idx,
                        sort: i
                    });
                }
            });

            // [0].checked
        },
        onClickSubmit() {
            if (!this.goods.use_datetime) return alert('상품노출날짜를 입력하세요');
            this.goods.color = [];
            this.MUTATION_OPTIONS_DATA(this.goods);
            let formData = new FormData();
            formData.append('mode', 'insert');
            formData.append('goodsData', JSON.stringify(this.GOODS));
            this.GOODS.THUMB.O.forEach((v, i) => {
                formData.append(`imgO${i}`, v);
            });
            formData.append(`imgOCnt`, this.GOODS.THUMB.O.length);
            this.GOODS.THUMB.O.forEach((v, i) => {
                formData.append(`imgO${i}`, v);
            });

            this.GOODS.THUMB.D.forEach((v, i) => {
                formData.append(`imgD${i}`, v);
            });
            formData.append(`imgDCnt`, this.GOODS.THUMB.D.length);

            this.GOODS.THUMB.T.forEach((v, i) => {
                formData.append(`imgT${i}`, v);
            });
            formData.append(`imgTCnt`, this.GOODS.THUMB.T.length);

            this.GOODS.OPTIONS.img.forEach((v, i) => {
                formData.append(`optionImg${i}`, v);
            });
            formData.append(`optionImgCnt`, this.GOODS.OPTIONS.length);

            this.ACTION_GOODS_INSERT(formData);
        }
    }
};
</script>


<style>
</style>