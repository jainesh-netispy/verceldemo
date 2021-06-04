/**
 * @file User Action Creator
 * @since 1.0.0
 * @author xiejiahe <xjh22222228@gmail.com>
 */
// import config from "@/config";
// import _ from "lodash";
// import moment from "moment";
// import { USER } from "../constants";
// import { LOCAL_STORAGE } from "@/constants";
import {
  serviceAddBrand,
  serviceGetBrand,
  serviceAddUser,
  // serviceEditUser,
  serviceGetOptions,
  serviceAddBoiler,
  serviceGetBoiler,
  serviceAddBoilerModel,
  serviceAddFuelType,
  serviceGetFuelType,
  serviceGetBoilerModel,
  serviceAddBoilerType,
  serviceGetBoilerType,
  serviceDeleteBrand,
  serviceDeleteModel,
  serviceDeleteType,
  serviceDeleteFuelType,
  serviceDeleteBoiler,
  serviceGetBoilerById,
  serviceAddService,
  serviceGetService,
  serviceGetServiceById,
  serviceDeleteService,
  serviceGetPostcodeByBoilerId,
  serviceGetBoilerModels,
} from '../../services'
import { Dispatch } from 'redux'
export function addBoiler(value: any, type: any) {
  return function (dispatch: Dispatch) {
    return serviceAddBoiler(value, type)
  }
}

export function getBoiler(pagination: any) {
  return function (dispatch: Dispatch) {
    return serviceGetBoiler(pagination)
  }
}
export function getBoilerById(id: any) {
  return function (dispatch: Dispatch) {
    return serviceGetBoilerById(id)
  }
}

// export function editBoiler(value: any) {
//   return function (dispatch: Dispatch) {
//     return serviceEditBoiler(value);
//   };
// }
export function deleteBoiler(id: any) {
  return function (dispatch: Dispatch) {
    return serviceDeleteBoiler(id)
  }
}
export function addService(value: any, type: any) {
  return function (dispatch: Dispatch) {
    return serviceAddService(value, type)
  }
}

export function getService(pagination: any) {
  return function (dispatch: Dispatch) {
    return serviceGetService(pagination)
  }
}
export function getServiceById(id: any) {
  return function (dispatch: Dispatch) {
    return serviceGetServiceById(id)
  }
}

export function getPostcodeByBoilerId(id: any) {
  return function (dispatch: Dispatch) {
    return serviceGetPostcodeByBoilerId(id)
  }
}

// export function editService(value: any) {
//   return function (dispatch: Dispatch) {
//     return serviceEditService(value);
//   };
// }
export function deleteService(id: any) {
  return function (dispatch: Dispatch) {
    return serviceDeleteService(id)
  }
}
export function getOptions() {
  return function (dispatch: Dispatch) {
    return serviceGetOptions()
  }
}
export function addBrand(value: any, type: any) {
  return function (dispatch: Dispatch) {
    return serviceAddBrand(value, type)
  }
}
export function deleteBrand(id: any) {
  return function (dispatch: Dispatch) {
    return serviceDeleteBrand(id)
  }
}

export function getBrand(params: any) {
  return function (dispatch: Dispatch) {
    return serviceGetBrand(params)
  }
}

// export function editUser(id: any, value: any) {
//   return function (dispatch: Dispatch) {
//     return serviceEditUser(id, value);
//   };
// }
export function addBoilerModel(value: any, type: any) {
  return function (dispatch: Dispatch) {
    return serviceAddBoilerModel(value, type)
  }
}
export function deleteModel(id: any) {
  return function (dispatch: Dispatch) {
    return serviceDeleteModel(id)
  }
}

export function getBoilerModel(params: any) {
  return function (dispatch: Dispatch) {
    return serviceGetBoilerModel(params)
  }
}
export function addBoilerType(value: any, type: any) {
  return function (dispatch: Dispatch) {
    return serviceAddBoilerType(value, type)
  }
}
export function deleteType(id: any) {
  return function (dispatch: Dispatch) {
    return serviceDeleteType(id)
  }
}
export function getBoilerType(params: any) {
  return function (dispatch: Dispatch) {
    return serviceGetBoilerType(params)
  }
}
export function addFuelType(value: any, type: any) {
  return function (dispatch: Dispatch) {
    return serviceAddFuelType(value, type)
  }
}
export function deleteFuelType(id: any) {
  return function (dispatch: Dispatch) {
    return serviceDeleteFuelType(id)
  }
}
export function getFuelType(params: any) {
  return function (dispatch: Dispatch) {
    return serviceGetFuelType(params)
  }
}
export function getBoilerModels(params: any) {
  return function (dispatch: Dispatch) {
    return serviceGetBoilerModels(params)
  }
}
