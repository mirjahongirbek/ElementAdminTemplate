import axios from "axios";

var /*host = //'https://factura.yt.uz',
    host = 'https://facturatest.yt.uz',
    username = '123',
    password = '123',*/
    keyCode = '',
    pcksSeven = null,
    EIMZO_MAJOR = 3,
    EIMZO_MINOR = 37,
    errorCAPIWS = 'Ошибка соединения с E-IMZO. Возможно у вас не установлен модуль E-IMZO или Браузер E-IMZO.',
    errorBrowserWS = 'Браузер не поддерживает технологию WebSocket. Установите последнюю версию браузера.',
    errorUpdateApp = 'ВНИМАНИЕ !!! Установите новую версию приложения E-IMZO или Браузера E-IMZO.<br /><a href="https://e-imzo.uz/main/downloads/" role="button">Скачать ПО E-IMZO</a>',
    errorWrongPassword = 'Пароль неверный.';

export default {
    install: function (Vue, options) {
        Vue.prototype.$application = {
            callbackApi: null,
            timeStamper(signatureHex, callback, fail) {
                console.log(Vue.prototype.$application.api)
                if(Vue.prototype.$application.api == null) {
                    console.log('eimzo axios is empty')
                    return;
                }

                Vue.prototype.$application.api.get('factura/timestamp', {params: {signatureHex}})
                    .then(response => {
                        console.log('response', response)
                        if(response.success){
                            callback(response.data)
                        }else{
                            fail(data.reason);
                        }
                    }).catch(error => {
                    fail(error.response);
                })
            },
            /*setHeader() {
               /!* let _this = this;
                axios.defaults.headers.common = {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Authorization': "Bearer " + TokenService.getToken(),
                };*!/
            },
            async getId() {
                //this.setHeader();

                if(Vue.prototype.$application.api == null) {
                    console.log('eimzo axios is empty')
                    return;
                }
                await Vue.prototype.$application.api.get('factura/guid')
                    .then(response => {
                        return response;
                    }).catch(error => {
                        console.log('error in getId');
                    })
                /!*await axios.get(host + '/provider/api/ru/utils/guid')
                    .then(response => {
                        return response.data;
                    }).catch(error => {
                        console.log('error in getId');
                    })*!/
            },*/
            appLaunch: function (successCallback = null, errorCallback = null) {
                let _this = this;
                /*EIMZOClient.API_KEYS = [
                    'localhost', '96D0C1491615C82B9A54D9989779DF825B690748224C2B04F500F370D51827CE2644D8D4A82C18184D73AB8530BB8ED537269603F61DB0D03D2104ABF789970B',
                    '127.0.0.1', 'A7BCFA5D490B351BE0754130DF03A068F855DB4333D43921125B9CF2670EF6A40370C646B90401955E1F7BC9CDBF59CE0B2C5467D820BE189C845D0B79CFC96F',
                    'null', 'E0A205EC4E7B78BBB56AFF83A733A1BB9FD39D562E67978CC5E7D73B0951DB1954595A20672A63332535E13CC6EC1E1FC8857BB09E0855D7E76E411B6FA16E9D'
                ];*/

                EIMZOClient.API_KEYS = [
                    'localhost', '96D0C1491615C82B9A54D9989779DF825B690748224C2B04F500F370D51827CE2644D8D4A82C18184D73AB8530BB8ED537269603F61DB0D03D2104ABF789970B',
                    '127.0.0.1', 'A7BCFA5D490B351BE0754130DF03A068F855DB4333D43921125B9CF2670EF6A40370C646B90401955E1F7BC9CDBF59CE0B2C5467D820BE189C845D0B79CFC96F',
                    'edo.uzcardtrade.uz', '2CDFBE9007D8AF296FC18F3C9C382620A053B9E71609F48785B58B62642E7D3D2113BA1B55420863FD0A1C18358C323BC2166936935D97830998A8610F70565F',
                    'null', 'E0A205EC4E7B78BBB56AFF83A733A1BB9FD39D562E67978CC5E7D73B0951DB1954595A20672A63332535E13CC6EC1E1FC8857BB09E0855D7E76E411B6FA16E9D',
                ];
                this.uiLoading();
                EIMZOClient.checkVersion(function (major, minor) {
                    let newVersion = EIMZO_MAJOR * 100 + EIMZO_MINOR;
                    let installedVersion = parseInt(major) * 100 + parseInt(minor);

                    if (installedVersion < newVersion) {
                       
                    } else {
                        EIMZOClient.installApiKeys(
                            function () {
                            _this.uiLoadKeys(successCallback, errorCallback);
                            },
                            function (e, r) {
                                if(errorCallback){
                                    errorCallback()
                                }
                                if (r) {

                                    _this.uiShowMessage(r);
                                } else {
                                    if(error){
                                        error()
                                    }
                                    _this.wsError(e);
                                }
                            }
                        );
                    }
                }, function (e, r) {
                    if(errorCallback){
                        errorCallback()
                    }
                    console.log(e, r)
                    if (r) {
                        _this.uiShowMessage(r);
                    } else {
                        _this.uiNotLoaded(e);
                    }
                });
            },
            uiShowMessage(message) {
                if (this.callbackApi) {
                    this.callbackApi('', true)
                }
                console.log('showmessage', message);
            },
            uiLoading() {
                //console.log('loadding ui');
                let l = document.getElementById('message');
                l.innerHTML = 'Загрузка ...';
                l.style.color = 'red';
            },
            uiNotLoaded(e) {
                let _this = this;
                let l = document.getElementById('message');
                l.innerHTML = '';
                if (e) {
                    _this.wsError(e);
                } else {
                    _this.uiShowMessage(errorBrowserWS);
                }
            },
            uiUpdateApp() {
                //console.log('uiUpdate');
                let l = document.getElementById('message');
                l.innerHTML = errorUpdateApp;
            },
            uiLoadKeys: function (successCallback, errorCalback) {
                let _this = this;
                _this.uiClearCombo();


                EIMZOClient.listAllUserKeys(function (o, i) {
                    let itemId = "itm-" + o.serialNumber + "-" + i;
                    return itemId;
                }, function (itemId, v) {
                    return _this.uiCreateItem(itemId, v);
                }, function (items, firstId) {
                    _this.uiFillCombo(items);
                    _this.uiLoaded();
                    _this.uiComboSelect(firstId);

                    if(successCallback){
                        successCallback();
                    }
                }, function (e, r) {
                    _this.uiShowMessage(errorCAPIWS);
                });
            },
            uiComboSelect(itm) {
                if (itm) {
                    var id = document.getElementById(itm);
                    id.setAttribute('selected', 'true');
                }
            },
            cbChanged(c) {
                document.getElementById('keyId').innerHTML = '';
            },
            uiClearCombo() {
                if (document.testform) {
                    var combo = document.testform.key;
                    combo.length = 0;
                }

            },
            uiFillCombo(items) {

                if (document.testform) {
                    var combo = document.testform.key;
                    for (var itm in items) {
                        combo.append(items[itm]);
                    }
                }

            },
            uiLoaded() {
                var l = document.getElementById('message');

                if (l != null)
                    l.innerHTML = '';
            },
            uiCreateItem(itmkey, vo) {
                let now = new Date();
                vo.expired = dates.compare(now, vo.validTo) > 0;
                let itm = document.createElement("option");
                itm.value = itmkey;
                itm.text = "(" + vo.TIN + ") " + vo.CN;
                if (vo.expired) {
                    itm.disabled = true
                    itm.style.color = 'gray';
                    itm.text = itm.text + ' (срок истек)';
                }
                itm.setAttribute('vo', JSON.stringify(vo));
                itm.setAttribute('id', itmkey);
                return itm;
            },
            wsError(e) {
                let _this = this;
                if (e) {
                    _this.uiShowMessage(errorCAPIWS + " : " + e);
                } else {
                    _this.uiShowMessage(errorBrowserWS);
                }
            },
            sign(jsonData, callback = null) {

                this.callbackApi = callback

                //console.log('copmig to sign');

                let _this = this;
                var itm = document.testform.key.value;

                if (itm) {
                    var id = document.getElementById(itm);
                    console.log(id, 'id', 'itm', itm)
                    var vo = JSON.parse(id.getAttribute('vo'));
                    _this.keyCode = _this.getKeyToStore()
                    if (_this.keyCode) {
                        console.log('before create')
                        EIMZOClient.createPkcs7(_this.keyCode, jsonData, _this.timeStamper, function (pkcs7) {
                            _this.pcksSeven = pkcs7;
                            
                            if (callback) {
                                //console.log('callback');
                                callback(pkcs7);
                            } else {
                                //console.log('no callback');
                            }
                        }, function (e, r) {
                            console.log('has error', e, r)
                            if (r) {
                                if (r.indexOf("BadPaddingException") != -1) {
                                    _this.uiShowMessage(errorWrongPassword);
                                } else {
                                    _this.uiShowMessage(r);
                                }
                            } else {
                                _this.pcksSeven = '';
                                _this.uiShowMessage(errorBrowserWS);
                            }
                            if (e) _this.wsError(e);
                        });
                    } else {

                        
                        EIMZOClient.loadKey(vo, function (id) {
                            _this.addKeyToStore(id)
                            _this.keyCode = id;

                            

                            console.log(id)

                            EIMZOClient.createPkcs7(id, jsonData, _this.timeStamper, function (pkcs7) {
                                
                                if (callback) {
                                    
                                    callback(pkcs7);
                                } else {
                                    //console.log('no callback');
                                }
                                _this.pcksSeven = pkcs7;
                            }, function (e, r) {
                                if (r) {
                                    if (r.indexOf("BadPaddingException") != -1) {
                                        _this.uiShowMessage(errorWrongPassword);
                                    } else {
                                        _this.uiShowMessage(r);
                                    }
                                } else {
                                    _this.removeKeyToStore()
                                    _this.keyCode = '';
                                    _this.uiShowMessage(errorBrowserWS);
                                }
                                if (e) _this.wsError(e);
                            });
                        }, function (e, r) {
                            if (r) {
                                if (r.indexOf("BadPaddingException") != -1) {
                                    _this.uiShowMessage(errorWrongPassword);
                                } else {
                                    _this.uiShowMessage(r);
                                }
                            } else {
                                _this.uiShowMessage(errorBrowserWS);
                            }
                            if (e) _this.wsError(e);
                        });
                    }
                }
            },
            attachSign(jsonData, callback = null) {
                this.callbackApi = callback;
                let _this = this;
                let itm = document.testform.key.value;
                if (itm) {
                    let id = document.getElementById(itm);
                    let vo = JSON.parse(id.getAttribute('vo'));
                    _this.keyCode = this.getKeyToStore();
                    if (_this.keyCode) {
                        EIMZOClient.appendPkcs7Attached(_this.keyCode, jsonData, _this.timeStamper, function (pkcs7) {
                            _this.pcksSeven = pkcs7;

                            if (callback) {
                                console.log('callback', callback)
                                callback(pkcs7);
                            }
                        }, function (e, r) {
                            if (r) {
                                if (r.indexOf("BadPaddingException") != -1) {
                                    _this.uiShowMessage(errorWrongPassword);
                                } else {
                                    _this.uiShowMessage(r);
                                }
                            } else {
                                _this.keyCode = '';
                                _this.removeKeyToStore()
                                _this.uiShowMessage(errorBrowserWS);
                            }
                            if (e) _this.wsError(e);
                        });
                    } else {
                        EIMZOClient.loadKey(vo, function (id) {
                            document.getElementById('keyId').innerHTML = id;

                            EIMZOClient.appendPkcs7Attached(id, jsonData, _this.timeStamper, function (pkcs7) {
                                _this.pcksSeven = pkcs7;

                                if (callback) {

                                    console.log('callback', callback)
                                    callback(pkcs7);
                                }
                            }, function (e, r) {

                                if (r) {
                                    if (r.indexOf("BadPaddingException") != -1) {
                                        _this.uiShowMessage(errorWrongPassword);
                                    } else {
                                        _this.uiShowMessage(r);
                                    }
                                } else {
                                    _this.keyCode = '';
                                    _this.removeKeyToStore()
                                    _this.uiShowMessage(errorBrowserWS);
                                }
                                if (e) _this.wsError(e);
                            });
                        }, function (e, r) {
                            alert("load")
                            if (r) {
                                if (r.indexOf("BadPaddingException") != -1) {
                                    _this.uiShowMessage(errorWrongPassword);
                                } else {
                                    _this.uiShowMessage(r);
                                }
                            } else {
                                _this.uiShowMessage(errorBrowserWS);
                            }
                            if (e) _this.wsError(e);
                        });
                    }
                }
            },

            successCallback(){

            },
            errorCallback(){

            },
            addKeyToStore(value){
                localStorage.setItem('_keyCode', value)
            },
            getKeyToStore(){
                return localStorage.getItem('_keyCode')
            },
            removeKeyToStore(){
                localStorage.removeItem('_keyCode')
            },
            api: null
        }
    }
}
