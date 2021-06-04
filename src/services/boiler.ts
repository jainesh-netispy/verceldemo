import api from '../api'
import Axios from 'axios'
import { LOCAL_STORAGE } from '../constants'
import { notification } from 'antd'
import { unAuthorized } from '../utils/helper'
/* const userInfo = JSON.parse(localStorage.getItem(LOCAL_STORAGE.USER) as any);
const userToken = userInfo && userInfo.token ? userInfo.token : ""; */
const openNotification = error => {
  notification.open({
    message: 'Error',
    type: 'error',
    description: error,
  })
}

export const serviceGetBrand = async (params: any) => {
  try {
    const userInfo = JSON.parse(localStorage.getItem(LOCAL_STORAGE.USER) as any)
    const userToken = userInfo && userInfo.token ? userInfo.token : ''
    if (!userToken) {
      unAuthorized()
    }
    const result = await Axios.get(api.getBoilerBrand, {
      headers: {
        Authorization: `Bearer ${userToken}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      params: params,
    })
    return result
  } catch (error) {
    if (
      error &&
      error.response &&
      (error.response.status === 401 || error.response.status === 403)
    ) {
      unAuthorized()
    }
    openNotification(
      error ? (error.response ? (error.response.data ? error.response.data.message : '') : '') : '',
    )
  }
}
export const serviceAddBoiler = async (value: any, type: any) => {
  try {
    // const userInfo = JSON.parse(
    //   localStorage.getItem(LOCAL_STORAGE.USER) as any
    // );

    // const userToken = userInfo && userInfo.token ? userInfo.token : "";
    // const result = await Axios.post(api.addBoiler, value, {
    //   headers: {
    //     Authorization: `Bearer ${userToken}`,
    //     Accept: "application/json",
    //     "Content-Type": "application/json",
    //   },
    // });
    // return result;

    const userInfo = JSON.parse(localStorage.getItem(LOCAL_STORAGE.USER) as any)
    const userToken = userInfo && userInfo.token ? userInfo.token : ''
    if (!userToken) {
      unAuthorized()
    }
    const result =
      type == 'Add'
        ? await Axios.post(api.addBoiler, value, {
            headers: {
              Authorization: `Bearer ${userToken}`,
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
          })
        : await Axios.put(api.editBoilerSub, value, {
            headers: {
              Authorization: `Bearer ${userToken}`,
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
          })
    return result
  } catch (error) {
    if (
      error &&
      error.response &&
      (error.response.status === 401 || error.response.status === 403)
    ) {
      unAuthorized()
    }
    openNotification(
      error ? (error.response ? (error.response.data ? error.response.data.message : '') : '') : '',
    )
  }
}

export const serviceGetBoiler = async (pagination: any) => {
  try {
    const userInfo = JSON.parse(localStorage.getItem(LOCAL_STORAGE.USER) as any)
    const userToken = userInfo && userInfo.token ? userInfo.token : ''
    if (!userToken) {
      unAuthorized()
    }
    const result = await Axios.get(api.getBoiler, {
      headers: {
        Authorization: `Bearer ${userToken}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      params: pagination,
    })
    return result
  } catch (error) {
    if (
      error &&
      error.response &&
      (error.response.status === 401 || error.response.status === 403)
    ) {
      unAuthorized()
    }
    openNotification(
      error ? (error.response ? (error.response.data ? error.response.data.message : '') : '') : '',
    )
  }
}
export const serviceGetBoilerById = async (id: any) => {
  try {
    const userInfo = JSON.parse(localStorage.getItem(LOCAL_STORAGE.USER) as any)

    const userToken = userInfo && userInfo.token ? userInfo.token : ''
    if (!userToken) {
      unAuthorized()
    }
    const result = await Axios.get(api.boilerById + id, {
      headers: {
        Authorization: `Bearer ${userToken}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
    return result
  } catch (error) {
    if (
      error &&
      error.response &&
      (error.response.status === 401 || error.response.status === 403)
    ) {
      unAuthorized()
    }
    openNotification(
      error ? (error.response ? (error.response.data ? error.response.data.message : '') : '') : '',
    )
  }
}

export const serviceDeleteBoiler = async (value: any) => {
  try {
    const userInfo = JSON.parse(localStorage.getItem(LOCAL_STORAGE.USER) as any)
    const userToken = userInfo && userInfo.token ? userInfo.token : ''
    if (!userToken) {
      unAuthorized()
    }
    const result = await Axios.delete(api.deleteBoiler + value, {
      headers: {
        Authorization: `Bearer ${userToken}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      // data: {
      //   brandId: value
      // }
    })
    return result
  } catch (error) {
    if (
      error &&
      error.response &&
      (error.response.status === 401 || error.response.status === 403)
    ) {
      unAuthorized()
    }
    openNotification(
      error ? (error.response ? (error.response.data ? error.response.data.message : '') : '') : '',
    )
  }
}

export const serviceAddService = async (value: any, type: any) => {
  try {
    // const userInfo = JSON.parse(
    //   localStorage.getItem(LOCAL_STORAGE.USER) as any
    // );

    // const userToken = userInfo && userInfo.token ? userInfo.token : "";
    // const result = await Axios.post(api.addBoiler, value, {
    //   headers: {
    //     Authorization: `Bearer ${userToken}`,
    //     Accept: "application/json",
    //     "Content-Type": "application/json",
    //   },
    // });
    // return result;

    const userInfo = JSON.parse(localStorage.getItem(LOCAL_STORAGE.USER) as any)
    const userToken = userInfo && userInfo.token ? userInfo.token : ''

    if (!userToken) {
      unAuthorized()
    }

    const result = /* type == "Add"
        ?  */ await Axios.post(api.addService, value, {
      headers: {
        Authorization: `Bearer ${userToken}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
    /* : await Axios.put(api.addService, value, {
            headers: {
              Authorization: `Bearer ${userToken}`,
              Accept: "application/json",
              "Content-Type": "multipart/form-data",
            },
          }); */
    return result
  } catch (error) {
    if (
      error &&
      error.response &&
      (error.response.status === 401 || error.response.status === 403)
    ) {
      unAuthorized()
    }
    openNotification(
      error ? (error.response ? (error.response.data ? error.response.data.message : '') : '') : '',
    )
  }
}

export const serviceGetService = async (pagination: any) => {
  try {
    const userInfo = JSON.parse(localStorage.getItem(LOCAL_STORAGE.USER) as any)

    const userToken = userInfo && userInfo.token ? userInfo.token : ''

    if (!userToken) {
      unAuthorized()
    }

    const result = await Axios.get(api.getService, {
      headers: {
        Authorization: `Bearer ${userToken}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      params: pagination,
    })
    return result
  } catch (error) {
    if (
      error &&
      error.response &&
      (error.response.status === 401 || error.response.status === 403)
    ) {
      unAuthorized()
    }
    openNotification(
      error ? (error.response ? (error.response.data ? error.response.data.message : '') : '') : '',
    )
  }
}
export const serviceGetServiceById = async (id: any) => {
  try {
    const userInfo = JSON.parse(localStorage.getItem(LOCAL_STORAGE.USER) as any)

    const userToken = userInfo && userInfo.token ? userInfo.token : ''

    if (!userToken) {
      unAuthorized()
    }

    const result = await Axios.get(api.serviceById + id, {
      headers: {
        Authorization: `Bearer ${userToken}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
    return result
  } catch (error) {
    if (
      error &&
      error.response &&
      (error.response.status === 401 || error.response.status === 403)
    ) {
      unAuthorized()
    }
    openNotification(
      error ? (error.response ? (error.response.data ? error.response.data.message : '') : '') : '',
    )
  }
}

export const serviceDeleteService = async (value: any) => {
  try {
    const userInfo = JSON.parse(localStorage.getItem(LOCAL_STORAGE.USER) as any)
    const userToken = userInfo && userInfo.token ? userInfo.token : ''

    if (!userToken) {
      unAuthorized()
    }

    const result = await Axios.delete(api.deleteService + value, {
      headers: {
        Authorization: `Bearer ${userToken}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      // data: {
      //   brandId: value
      // }
    })
    return result
  } catch (error) {
    if (
      error &&
      error.response &&
      (error.response.status === 401 || error.response.status === 403)
    ) {
      unAuthorized()
    }
    openNotification(
      error ? (error.response ? (error.response.data ? error.response.data.message : '') : '') : '',
    )
  }
}
export const serviceDeleteBrand = async (value: any) => {
  try {
    const userInfo = JSON.parse(localStorage.getItem(LOCAL_STORAGE.USER) as any)
    const userToken = userInfo && userInfo.token ? userInfo.token : ''
    if (!userToken) {
      unAuthorized()
    }

    const result = await Axios.delete(api.deleteBoilerBrand + value, {
      headers: {
        Authorization: `Bearer ${userToken}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      // data: {
      //   brandId: value
      // }
    })
    return result
  } catch (error) {
    if (
      error &&
      error.response &&
      (error.response.status === 401 || error.response.status === 403)
    ) {
      unAuthorized()
    }
    openNotification(
      error ? (error.response ? (error.response.data ? error.response.data.message : '') : '') : '',
    )
  }
}
export const serviceAddBrand = async (value: any, type: any) => {
  try {
    const userInfo = JSON.parse(localStorage.getItem(LOCAL_STORAGE.USER) as any)
    const userToken = userInfo && userInfo.token ? userInfo.token : ''
    if (!userToken) {
      unAuthorized()
    }

    const result =
      type == 'Add'
        ? await Axios.post(api.addBoilerBrand, value, {
            headers: {
              Authorization: `Bearer ${userToken}`,
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
          })
        : await Axios.put(api.editBoilerBrand, value, {
            headers: {
              Authorization: `Bearer ${userToken}`,
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
          })
    return result
  } catch (error) {
    if (
      error &&
      error.response &&
      (error.response.status === 401 || error.response.status === 403)
    ) {
      unAuthorized()
    }
    openNotification(
      error ? (error.response ? (error.response.data ? error.response.data.message : '') : '') : '',
    )
  }
}
export const serviceGetBoilerModel = async (params: any) => {
  try {
    const userInfo = JSON.parse(localStorage.getItem(LOCAL_STORAGE.USER) as any)
    const userToken = userInfo && userInfo.token ? userInfo.token : ''
    if (!userToken) {
      unAuthorized()
    }
    const result = await Axios.get(api.getBoilerModel, {
      headers: {
        Authorization: `Bearer ${userToken}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      params: params,
    })
    return result
  } catch (error) {
    if (
      error &&
      error.response &&
      (error.response.status === 401 || error.response.status === 403)
    ) {
      unAuthorized()
    }
    openNotification(
      error ? (error.response ? (error.response.data ? error.response.data.message : '') : '') : '',
    )
  }
}
export const serviceAddBoilerModel = async (value: any, type: any) => {
  try {
    const userInfo = JSON.parse(localStorage.getItem(LOCAL_STORAGE.USER) as any)
    const userToken = userInfo && userInfo.token ? userInfo.token : ''
    if (!userToken) {
      unAuthorized()
    }
    const result =
      type == 'Add'
        ? await Axios.post(api.addBoilerModel, value, {
            headers: {
              Authorization: `Bearer ${userToken}`,
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
          })
        : await Axios.put(api.editBoilerModel, value, {
            headers: {
              Authorization: `Bearer ${userToken}`,
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
          })
    // await Axios.post(api.addBoilerBrand, value, {
    //   headers: {
    //     Authorization: `Bearer ${userToken}`,
    //     Accept: "application/json",
    //     "Content-Type": "application/json",
    //   },
    // });
    return result
  } catch (error) {
    if (
      error &&
      error.response &&
      (error.response.status === 401 || error.response.status === 403)
    ) {
      unAuthorized()
    }
    openNotification(
      error ? (error.response ? (error.response.data ? error.response.data.message : '') : '') : '',
    )
  }
}
export const serviceDeleteModel = async (value: any) => {
  try {
    const userInfo = JSON.parse(localStorage.getItem(LOCAL_STORAGE.USER) as any)
    const userToken = userInfo && userInfo.token ? userInfo.token : ''
    if (!userToken) {
      unAuthorized()
    }
    const result = await Axios.delete(api.deleteBoilerModel + value, {
      headers: {
        Authorization: `Bearer ${userToken}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      // data: {
      //   brandId: value
      // }
    })
    return result
  } catch (error) {
    if (
      error &&
      error.response &&
      (error.response.status === 401 || error.response.status === 403)
    ) {
      unAuthorized()
    }
    openNotification(
      error ? (error.response ? (error.response.data ? error.response.data.message : '') : '') : '',
    )
  }
}
export const serviceGetBoilerType = async (params: any) => {
  try {
    const userInfo = JSON.parse(localStorage.getItem(LOCAL_STORAGE.USER) as any)

    const userToken = userInfo && userInfo.token ? userInfo.token : ''
    if (!userToken) {
      unAuthorized()
    }
    const result = await Axios.get(api.getBoilerType, {
      headers: {
        Authorization: `Bearer ${userToken}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      params: params,
    })
    return result
  } catch (error) {
    if (
      error &&
      error.response &&
      (error.response.status === 401 || error.response.status === 403)
    ) {
      unAuthorized()
    }
    openNotification(
      error ? (error.response ? (error.response.data ? error.response.data.message : '') : '') : '',
    )
  }
}
export const serviceAddBoilerType = async (value: any, type: any) => {
  try {
    const userInfo = JSON.parse(localStorage.getItem(LOCAL_STORAGE.USER) as any)

    const userToken = userInfo && userInfo.token ? userInfo.token : ''
    if (!userToken) {
      unAuthorized()
    }
    const result =
      type == 'Add'
        ? await Axios.post(api.addBoilerType, value, {
            headers: {
              Authorization: `Bearer ${userToken}`,
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
          })
        : await Axios.put(api.editBoilerType, value, {
            headers: {
              Authorization: `Bearer ${userToken}`,
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
          })
    //  await Axios.post(api.addBoilerBrand, value, {
    //   headers: {
    //     Authorization: `Bearer ${userToken}`,
    //     Accept: "application/json",
    //     "Content-Type": "application/json",
    //   },
    // });
    return result
  } catch (error) {
    if (
      error &&
      error.response &&
      (error.response.status === 401 || error.response.status === 403)
    ) {
      unAuthorized()
    }
    openNotification(
      error ? (error.response ? (error.response.data ? error.response.data.message : '') : '') : '',
    )
  }
}
export const serviceDeleteType = async (value: any) => {
  try {
    const userInfo = JSON.parse(localStorage.getItem(LOCAL_STORAGE.USER) as any)
    const userToken = userInfo && userInfo.token ? userInfo.token : ''
    if (!userToken) {
      unAuthorized()
    }
    const result = await Axios.delete(api.deleteBoilerType + value, {
      headers: {
        Authorization: `Bearer ${userToken}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      // data: {
      //   brandId: value
      // }
    })
    return result
  } catch (error) {
    if (
      error &&
      error.response &&
      (error.response.status === 401 || error.response.status === 403)
    ) {
      unAuthorized()
    }
    openNotification(
      error ? (error.response ? (error.response.data ? error.response.data.message : '') : '') : '',
    )
  }
}

export const serviceGetFuelType = async (params: any) => {
  try {
    const userInfo = JSON.parse(localStorage.getItem(LOCAL_STORAGE.USER) as any)

    const userToken = userInfo && userInfo.token ? userInfo.token : ''
    if (!userToken) {
      unAuthorized()
    }
    const result = await Axios.get(api.getFuelType, {
      headers: {
        Authorization: `Bearer ${userToken}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      params: params,
    })
    return result
  } catch (error) {
    if (
      error &&
      error.response &&
      (error.response.status === 401 || error.response.status === 403)
    ) {
      unAuthorized()
    }
    openNotification(
      error ? (error.response ? (error.response.data ? error.response.data.message : '') : '') : '',
    )
  }
}
export const serviceAddFuelType = async (value: any, type: any) => {
  try {
    const userInfo = JSON.parse(localStorage.getItem(LOCAL_STORAGE.USER) as any)

    const userToken = userInfo && userInfo.token ? userInfo.token : ''
    if (!userToken) {
      unAuthorized()
    }
    const result =
      type == 'Add'
        ? await Axios.post(api.addFuelType, value, {
            headers: {
              Authorization: `Bearer ${userToken}`,
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
          })
        : await Axios.put(api.editFuelType, value, {
            headers: {
              Authorization: `Bearer ${userToken}`,
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
          })
    //  await Axios.post(api.addBoilerBrand, value, {
    //   headers: {
    //     Authorization: `Bearer ${userToken}`,
    //     Accept: "application/json",
    //     "Content-Type": "application/json",
    //   },
    // });
    return result
  } catch (error) {
    if (
      error &&
      error.response &&
      (error.response.status === 401 || error.response.status === 403)
    ) {
      unAuthorized()
    }
    openNotification(
      error ? (error.response ? (error.response.data ? error.response.data.message : '') : '') : '',
    )
  }
}
export const serviceDeleteFuelType = async (value: any) => {
  try {
    const userInfo = JSON.parse(localStorage.getItem(LOCAL_STORAGE.USER) as any)
    const userToken = userInfo && userInfo.token ? userInfo.token : ''
    if (!userToken) {
      unAuthorized()
    }
    const result = await Axios.delete(api.deleteFuelType + value, {
      headers: {
        Authorization: `Bearer ${userToken}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      // data: {
      //   brandId: value
      // }
    })
    return result
  } catch (error) {
    if (
      error &&
      error.response &&
      (error.response.status === 401 || error.response.status === 403)
    ) {
      unAuthorized()
    }
    openNotification(
      error ? (error.response ? (error.response.data ? error.response.data.message : '') : '') : '',
    )
  }
}

// export const serviceAddUser = async (value: any, type: any) => {
//   try {
//     const userInfo = JSON.parse(
//       localStorage.getItem(LOCAL_STORAGE.USER) as any
//     );

//     const userToken = userInfo && userInfo.token ? userInfo.token : "";
//     const result =
//       type == "Add"
//         ? await Axios.post(api.addUser, value, {
//             headers: {
//               Authorization: `Bearer ${userToken}`,
//               Accept: "application/json",
//               "Content-Type": "application/json",
//             },
//           })
//         : await Axios.put(api.editUser, value, {
//             headers: {
//               Authorization: `Bearer ${userToken}`,
//               Accept: "application/json",
//               "Content-Type": "application/json",
//             },
//           });
//     //  await Axios.post(api.addBoilerBrand, value, {
//     //   headers: {
//     //     Authorization: `Bearer ${userToken}`,
//     //     Accept: "application/json",
//     //     "Content-Type": "application/json",
//     //   },
//     // });
//     return result;
//   } catch (error) {
//     if (error && error.response && error.response.status === 401) {
//       unAuthorized();
//     }
//     openNotification(
//       error
//         ? error.response
//           ? error.response.data
//             ? error.response.data.message
//             : ""
//           : ""
//         : ""
//     );
//   }
//   // try {
//   //   const userInfo = JSON.parse(
//   //     localStorage.getItem(LOCAL_STORAGE.USER) as any
//   //   );

//   //   const userToken = userInfo && userInfo.token ? userInfo.token : "";
//   //   const result = await Axios.post(api.addBoilerBrand, value, {
//   //     headers: {
//   //       Authorization: `Bearer ${userToken}`,
//   //       Accept: "application/json",
//   //       "Content-Type": "application/json",
//   //     },
//   //   });
//   //   return result;
//   // } catch (error) {
//   //   //  if(error&&error.response&&error.response.status===401){
//   //   //   unAuthorized()
//   //   // }
//   //   openNotification(
//   //     error
//   //       ? error.response
//   //         ? error.response.data
//   //           ? error.response.data.message
//   //           : ""
//   //         : ""
//   //       : ""
//   //   );
//   // }
// };
// export const serviceEditUser = async (id:any,value:any  ) => {
//   try {
//     const userInfo = JSON.parse(
//       localStorage.getItem(LOCAL_STORAGE.USER) as any
//     );

//     const userToken = userInfo && userInfo.token ? userInfo.token : "";
//     const result = await Axios.put(api.addBoilerBrand,value, {
//       headers: {
//         Authorization: `Bearer ${userToken}`,
//         Accept: "application/json",
//         "Content-Type": "application/json",
//       },
//     });
//     return result;
//   } catch (error) {
//     //  if(error&&error.response&&error.response.status===401){
//     //   unAuthorized()
//     // }
//     openNotification(
//       error
//         ? error.response
//           ? error.response.data
//             ? error.response.data.message
//             : ""
//           : ""
//         : ""
//     );
//   }
// };

export const serviceGetOptions = async () => {
  try {
    const userInfo = JSON.parse(localStorage.getItem(LOCAL_STORAGE.USER) as any)

    const userToken = userInfo && userInfo.token ? userInfo.token : ''
    if (!userToken) {
      unAuthorized()
    }

    const result = await Axios.get(api.selectOption, {
      headers: {
        Authorization: `Bearer ${userToken}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
    return result
  } catch (error) {
    if (
      error &&
      error.response &&
      (error.response.status === 401 || error.response.status === 403)
    ) {
      unAuthorized()
    }
    openNotification(
      error ? (error.response ? (error.response.data ? error.response.data.message : '') : '') : '',
    )
  }
}

export const serviceGetPostcodeByBoilerId = async (id: any) => {
  try {
    const userInfo = JSON.parse(localStorage.getItem(LOCAL_STORAGE.USER) as any)

    const userToken = userInfo && userInfo.token ? userInfo.token : ''
    const result = await Axios.get(api.servicePostcode + id, {
      headers: {
        Authorization: `Bearer ${userToken}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
    return result
  } catch (error) {
    if (error && error.response && error.response.status === 401) {
      unAuthorized()
    }
    openNotification(
      error ? (error.response ? (error.response.data ? error.response.data.message : '') : '') : '',
    )
  }
}

export const serviceGetBoilerModels = async (id: any) => {
  try {
    const userInfo = JSON.parse(localStorage.getItem(LOCAL_STORAGE.USER) as any)

    const userToken = userInfo && userInfo.token ? userInfo.token : ''
    const result = await Axios.get(api.serviceBoilerModels + id, {
      headers: {
        Authorization: `Bearer ${userToken}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
    return result
  } catch (error) {
    if (error && error.response && error.response.status === 401) {
      unAuthorized()
    }
    openNotification(
      error ? (error.response ? (error.response.data ? error.response.data.message : '') : '') : '',
    )
  }
}
