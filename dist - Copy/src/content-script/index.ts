import { Applicant } from '~/interfaces/interfaces'
import './index.scss'

// const src = chrome.runtime.getURL('src/content-script/iframe/index.html')

// const iframe = new DOMParser().parseFromString(
//   `<iframe class="crx-iframe" src="${src}"></iframe>`,
//   'text/html'
// ).body.firstElementChild

// if (iframe) {
//   document.body?.append(iframe)
// }

const header = document.querySelectorAll('.card-header')![0] as HTMLElement
function ifConfPage(el: HTMLElement) {
  if (el && el.innerHTML.includes('Confirmation')) return 'confirmation'
  return 'registration'
}

const flashPage = (bool: boolean) => {
  if (bool == false) {
    const body = document.querySelector('#escform') as HTMLElement
    body.style.backgroundColor = 'rgba(43, 43, 43,0.4)'
    body.style.transition = 'all 0.5s ease-in-out'
    setTimeout(() => {
      body.style.backgroundColor = 'initial'
    }, 500)
  } else {
    const body = document.querySelector('#form') as HTMLElement
    body.style.backgroundColor = 'rgba(43, 43, 43,0.4)'
    body.style.transition = 'all 0.5s ease-in-out'
    setTimeout(() => {
      body.style.backgroundColor = 'initial'
    }, 500)
  }
}

const what_page = ifConfPage(header)
console.log(what_page)

// let apl: Applicant | null = null

chrome.runtime.onMessage.addListener((msg, sender, response) => {
  if (msg.apl) logTheShit(msg)

  if (msg.page == 'conf') {
    const { conf_code } = getConfNodes()
    response(conf_code.innerHTML)
  }
})

function logTheShit(message: any) {
  if (message.apl) {
    console.log(message.apl)

    if (typeof message === 'object') {
      if (what_page === 'confirmation') {
        FillConfirmationPage(message.apl)
        flashPage(false)
      } else {
        FillRegistrationPage(message.apl)
        flashPage(true)
      }
    }
  } else if (message.page == 'conf') {
    const { conf_code } = getConfNodes()
    console.log(conf_code)

    if (conf_code) alert(conf_code.innerHTML)
  }
  // chrome.runtime.onMessage.removeListener(logTheShit) //optional
}

function getConfNodes() {
  const name = document.querySelectorAll('.fnt3')[0] as HTMLDivElement
  const conf_code = document.querySelectorAll('.fnt3')[1] as HTMLDivElement
  const yob = document.querySelectorAll('.fnt3')[2] as HTMLDivElement
  return {
    name,
    conf_code,
    yob,
  }
}

function getNodesForConfirmationPage() {
  const confCode = document.querySelectorAll('#txtCN')[0] as HTMLInputElement
  const lastName = document.querySelectorAll(
    '#txtLastName'
  )[0] as HTMLInputElement
  const YOB = document.querySelectorAll('#txtYOB')[0] as HTMLInputElement

  return {
    confCode,
    lastName,
    YOB,
  }
}

function getNodesForRegistrationPage(apl: Applicant) {
  const pageTitle = document.querySelectorAll('.m9090')
  const pageCardBodyz = document.querySelectorAll('.card-body')

  const imageBox = document.querySelectorAll('.card-header')[6]

  const plastName = document.querySelector(
    '#ContentPlaceHolder1_formApplicant__ctl0_txtLastName'
  )
  const pfirstName = document.querySelector(
    '#ContentPlaceHolder1_formApplicant__ctl0_txtFirstName'
  )
  const potherName = document.querySelector(
    '#ContentPlaceHolder1_formApplicant__ctl0_txtMiddleName'
  )
  const noOtherName = document.querySelector(
    '#ContentPlaceHolder1_formApplicant__ctl0_cbxMiddleName'
  )
  const pdob_day = document.querySelector(
    '#ContentPlaceHolder1_formApplicant__ctl2_txtDayOfBirth'
  )
  const pdob_month = document.querySelector(
    '#ContentPlaceHolder1_formApplicant__ctl2_txtMonthOfBirth'
  )
  const pdob_year = document.querySelector(
    '#ContentPlaceHolder1_formApplicant__ctl2_txtYearOfBirth'
  )
  const pcity_ob = document.querySelector(
    '#ContentPlaceHolder1_formApplicant__ctl3_txtBirthCity'
  )
  const pcountry_ob = document.querySelector(
    '#ContentPlaceHolder1_formApplicant__ctl4_drpBirthCountry'
  )
  const pgenderM = document.querySelector(
    '#ContentPlaceHolder1_formApplicant__ctl1_rdoGenderM'
  )
  const pgenderF = document.querySelector(
    '#ContentPlaceHolder1_formApplicant__ctl1_rdoGenderF'
  )
  const pemail = document.querySelector(
    '#ContentPlaceHolder1_formApplicant__ctl10_txtEmailAddress'
  )
  const confirm_email = document.querySelector(
    '#ContentPlaceHolder1_formApplicant__ctl10_txtConfEmailAddress'
  )
  const primeImgFile = document.querySelector(
    '#ContentPlaceHolder1_formApplicant__ctl6_btnPhotoBox'
  )
  const pcountry_live_today = document.querySelector(
    '#ContentPlaceHolder1_formApplicant__ctl8_drpCountry'
  )
  const ppostal = document.querySelector(
    '#ContentPlaceHolder1_formApplicant__ctl7_txtAddress1'
  )

  const EL = {
    PRI: document.querySelector(
      '#ContentPlaceHolder1_formApplicant__ctl11_rblEducation_0'
    ),
    JHS: document.querySelector(
      '#ContentPlaceHolder1_formApplicant__ctl11_rblEducation_1'
    ),
    SHS: document.querySelector(
      '#ContentPlaceHolder1_formApplicant__ctl11_rblEducation_2'
    ),
    VOC: document.querySelector(
      '#ContentPlaceHolder1_formApplicant__ctl11_rblEducation_3'
    ),
    SOME_UNI: document.querySelector(
      '#ContentPlaceHolder1_formApplicant__ctl11_rblEducation_4'
    ),
    UNI: document.querySelector(
      '#ContentPlaceHolder1_formApplicant__ctl11_rblEducation_5'
    ),
    SOME_GRAD: document.querySelector(
      '#ContentPlaceHolder1_formApplicant__ctl11_rblEducation_6'
    ),
    MAST: document.querySelector(
      '#ContentPlaceHolder1_formApplicant__ctl11_rblEducation_7'
    ),
    SOME_PHD: document.querySelector(
      '#ContentPlaceHolder1_formApplicant__ctl11_rblEducation_8'
    ),
    PHD: document.querySelector(
      '#ContentPlaceHolder1_formApplicant__ctl11_rblEducation_9'
    ),
  }

  const MS = {
    UNM: document.querySelector(
      '#_ctl0_ContentPlaceHolder1_formApplicant__ctl12_rblMarried_0'
    ),
    MAR: document.querySelector(
      '#_ctl0_ContentPlaceHolder1_formApplicant__ctl12_rblMarried_1'
    ),
    DIV: document.querySelector(
      '#_ctl0_ContentPlaceHolder1_formApplicant__ctl12_rblMarried_2'
    ),
    WID: document.querySelector(
      '#_ctl0_ContentPlaceHolder1_formApplicant__ctl12_rblMarried_3'
    ),
    LEGSEP: document.querySelector(
      '#_ctl0_ContentPlaceHolder1_formApplicant__ctl12_rblMarried_4'
    ),
  }

  const postalcode = document.querySelector(
    '#ContentPlaceHolder1_formApplicant__ctl7_txtZipCode'
  )
  const mailing_country = document.querySelector(
    '#ContentPlaceHolder1_formApplicant__ctl7_drpMailingCountry'
  )
  const children_number = document.querySelector(
    '#ContentPlaceHolder1_formApplicant__ctl13_txtNumChildren'
  )
  const address_city = document.querySelector(
    '#ContentPlaceHolder1_formApplicant__ctl7_txtCity'
  )
  const address_state = document.querySelector(
    '#ContentPlaceHolder1_formApplicant__ctl7_txtDistrict'
  )
  const pcountryOptions = document.querySelectorAll(
    '#ContentPlaceHolder1_formApplicant__ctl4_drpBirthCountry > option'
  )
  const scountryOptions = document.querySelectorAll(
    '#ContentPlaceHolder1_formSpouse_qBirthCountry_drpBirthCountry > option'
  )
  const wcountryOptions = document.querySelectorAll(
    '#ContentPlaceHolder1_formChild01_qBirthCountry_drpBirthCountry > option'
  )

  // spouse nodes
  const slastName = document.querySelector(
    '#ContentPlaceHolder1_formSpouse_qName_txtLastName'
  )
  const sfirstName = document.querySelector(
    '#ContentPlaceHolder1_formSpouse_qName_txtFirstName'
  )
  const sotherName = document.querySelector(
    '#ContentPlaceHolder1_formSpouse_qName_txtMiddleName'
  )
  const snoOtherName = document.querySelector(
    '#ContentPlaceHolder1_formSpouse_qName_cbxMiddleName'
  )
  const sdob_day = document.querySelector(
    '#ContentPlaceHolder1_formSpouse_qBirthDate_txtDayOfBirth'
  )
  const sdob_month = document.querySelector(
    '#ContentPlaceHolder1_formSpouse_qBirthDate_txtMonthOfBirth'
  )
  const sdob_year = document.querySelector(
    '#ContentPlaceHolder1_formSpouse_qBirthDate_txtYearOfBirth'
  )
  const sgenderM = document.querySelector(
    '#ContentPlaceHolder1_formSpouse_qGender_rdoGenderM'
  )
  const sgenderF = document.querySelector(
    '#ContentPlaceHolder1_formSpouse_qGender_rdoGenderF'
  )
  const scountry_ob = document.querySelector(
    '#ContentPlaceHolder1_formSpouse_qBirthCountry_drpBirthCountry'
  )
  const scity_ob = document.querySelector(
    '#ContentPlaceHolder1_formSpouse_qBirthCity_txtBirthCity'
  )

  // ward nodes
  let w_ = []
  if (apl) {
    for (let ii = 1; ii <= apl.children_number; ii++) {
      const ward = {
        lastName: document.querySelector(
          `#ContentPlaceHolder1_formChild0${ii}_qName_txtLastName`
        ),
        firstName: document.querySelector(
          `#ContentPlaceHolder1_formChild0${ii}_qName_txtFirstName`
        ),
        otherName: document.querySelector(
          `#ContentPlaceHolder1_formChild0${ii}_qName_txtMiddleName`
        ),
        noOtherName: document.querySelector(
          `#ContentPlaceHolder1_formChild0${ii}_qName_cbxMiddleName`
        ),
        dob_day: document.querySelector(
          `#ContentPlaceHolder1_formChild0${ii}_qBirthDate_txtDayOfBirth`
        ),
        dob_month: document.querySelector(
          `#ContentPlaceHolder1_formChild0${ii}_qBirthDate_txtMonthOfBirth`
        ),
        dob_year: document.querySelector(
          `#ContentPlaceHolder1_formChild0${ii}_qBirthDate_txtYearOfBirth`
        ),
        city_ob: document.querySelector(
          `#ContentPlaceHolder1_formChild0${ii}_qBirthCity_txtBirthCity`
        ),
        country_ob: document.querySelector(
          `#ContentPlaceHolder1_formChild0${ii}_qBirthCountry_drpBirthCountry`
        ),
        genderM: document.querySelector(
          `#ContentPlaceHolder1_formChild0${ii}_qGender_rdoGenderM`
        ),
        genderF: document.querySelector(
          `#ContentPlaceHolder1_formChild0${ii}_qGender_rdoGenderF`
        ),
      }
      w_.push(ward)
    }
  } else {
    w_ = []
  }

  const confirmation = {
    code: document.querySelectorAll('.fnt3')[1],
  }

  return {
    pageTitle,
    pageCardBodyz,
    confirmation,
    imageBox,
    w_,
    snoOtherName,
    scity_ob,
    scountry_ob,
    sgenderM,
    sgenderF,
    sdob_day,
    sdob_year,
    sdob_month,
    slastName,
    sfirstName,
    sotherName,
    address_city,
    address_state,
    children_number,
    pfirstName,
    plastName,
    potherName,
    pcity_ob,
    pcountry_live_today,
    pdob_day,
    pdob_month,
    pdob_year,
    pcountry_ob,
    pemail,
    pgenderM,
    pgenderF,
    ppostal,
    primeImgFile,
    confirm_email,
    mailing_country,
    postalcode,
    noOtherName,
    EL,
    MS,
    pcountryOptions,
    scountryOptions,
    wcountryOptions,
  }
}

function FillConfirmationPage(apl: Applicant) {
  const val = getNodesForConfirmationPage()
  console.log(val)
  console.log(apl)

  const { confCode, lastName, YOB } = getNodesForConfirmationPage()

  confCode.value = apl.pconf_code!
  lastName.value = apl.plastName!
  YOB.value = new Date(apl.pdob!).getFullYear().toString()
}

function FillRegistrationPage(apl: Applicant) {
  const __ = getNodesForRegistrationPage(apl)

  if (__.plastName) setPrimeData(apl, __)
  if (__.slastName || __.w_.some((w) => w.lastName)) setSecWardData(apl, __)
}

// function setPrimeData(apl: Applicant, n_: any, addr: any) {
function setPrimeData(apl: Applicant, n_: any) {
  n_.plastName.value =
    n_.plastName && apl.plastName ? apl.plastName.toUpperCase() : ''

  n_.pfirstName.value =
    n_.pfirstName && apl.pfirstName ? apl.pfirstName.toUpperCase() : ''

  if (!apl.potherName) {
    n_.noOtherName.checked = true
    n_.potherName.disabled = true
    n_.potherName.value = ''
  } else {
    n_.potherName.value = apl.potherName.toUpperCase()
    n_.noOtherName.checked = false
    n_.potherName.disabled = false
  }

  if (apl.pgender === 'MALE') {
    n_.pgenderM.checked = true
    n_.pgenderF.checked = false
  } else if (apl.pgender === 'FEMALE') {
    n_.pgenderM.checked = false
    n_.pgenderF.checked = true
  }

  const [day, month, year] = parseTimestamp(apl.pdob!)
  n_.pdob_day.value = n_.pdob_day && apl.pdob ? day : 0
  n_.pdob_month.value = n_.pdob_month && apl.pdob ? month : 0
  n_.pdob_year.value = n_.pdob_year && apl.pdob ? year : 0

  n_.pcity_ob.value =
    n_.pcity_ob && apl.pcity_ob ? apl.pcity_ob.toUpperCase() : ''

  setCountry_ob(n_.pcountryOptions, n_.pcountry_ob, apl.pcountry_ob)

  setCountry_ob(
    n_.pcountryOptions,
    n_.pcountry_live_today,
    apl.pcountry_live_today
  )

  // n_.pcountry_live_today.value = '86'

  const e_m = `${apl.plastName.replace(/\s+/g, '')}${year}@GMAIL.COM`
  n_.pemail.value = typeof e_m == 'string' ? e_m : ''
  n_.confirm_email.value = typeof e_m == 'string' ? e_m : ''

  const addr = randAddr()
  n_.ppostal.value = addr.address
  n_.mailing_country.value = '22'
  n_.postalcode.value = '00233'
  n_.address_city.value = addr.reg_cities[1]
  n_.address_state.value = addr.reg_cities[0]
  // n_.address_city.value = apl.ppostal
  // n_.address_state.value = apl.ppostal

  switch (apl.pmarital_status) {
    case 'UNMARRIED':
      n_.MS.UNM.checked = true
      break
    case 'MARRIED':
      n_.MS.MAR.checked = true
      break
    case 'DIVORCED':
      n_.MS.DIV.checked = true
      break
    case 'WIDOWED':
      n_.MS.WID.checked = true
      break
    case 'LEGALLY SEPARATED':
      n_.MS.LEGSEP.checked = true
      break
  }

  switch (apl.peducation_level) {
    case 'primary school only'.toUpperCase():
      n_.EL.PRI.checked = true
      break

    case 'high school, no degree'.toUpperCase():
      n_.EL.JHS.checked = true
      break

    case 'high school degree'.toUpperCase():
      n_.EL.SHS.checked = true
      break

    case 'vocational school'.toUpperCase():
      n_.EL.VOC.checked = true
      break

    case 'some university courses'.toUpperCase():
      n_.EL.SOME_UNI.checked = true
      break
    case 'university degree'.toUpperCase():
      n_.EL.UNI.checked = true
      break
    case 'some graduate level courses'.toUpperCase():
      n_.EL.SOME_GRAD.checked = true
      break
    case 'masters degree'.toUpperCase():
      n_.EL.MAST.checked = true
      break
    case 'some doctorate level courses'.toUpperCase():
      n_.EL.SOME_PHD.checked = true
      break
    case 'doctorate degree'.toUpperCase():
      n_.EL.PHD.checked = true
      break
  }

  n_.children_number.value = apl.children_number
}

function setCountry_ob(n_: any, $country: HTMLInputElement, country: string) {
  for (let ii = 0; ii < n_.length; ii++) {
    const option = n_[ii]
    const name = option.innerHTML
    const value = option.value

    if (name == `${capitalize(country)}`.trim()) {
      $country.value = value
    }
  }
}

function capitalize(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()
}

function setSecWardData(apl: Applicant, n_: any) {
  if (n_.slastName) {
    n_.slastName.value =
      n_.slastName && apl.slastName ? apl.slastName.toUpperCase() : ''

    n_.sfirstName.value =
      n_.sfirstName && apl.sfirstName ? apl.sfirstName.toUpperCase() : ''

    n_.scity_ob.value =
      n_.scity_ob && apl.scity_ob ? apl.scity_ob.toUpperCase() : ''

    if (!apl.sotherName) {
      n_.snoOtherName.checked = true
      n_.sotherName.disabled = true
      n_.sotherName.value = ''
    } else {
      n_.sotherName.value = n_.sotherName ? apl.sotherName.toUpperCase() : ''
      n_.snoOtherName.checked = false
      n_.sotherName.disabled = false
    }

    setCountry_ob(n_.scountryOptions, n_.scountry_ob, apl.scountry_ob)

    if (apl.sgender === 'male'.toUpperCase()) {
      n_.sgenderM.checked = true
      n_.sgenderF.checked = false
    } else {
      n_.sgenderM.checked = false
      n_.sgenderF.checked = true
    }

    const [day, month, year] = parseTimestamp(apl.sdob!)
    n_.sdob_day.value = n_.sdob_day && apl.sdob ? day : 0
    n_.sdob_month.value = n_.sdob_month && apl.sdob ? month : 0
    n_.sdob_year.value = n_.sdob_year && apl.sdob ? year : 0
  }

  // looping through to input ward details
  if (n_.w_.length > 0) {
    for (let ii = 0; ii < n_.w_.length; ii++) {
      const ward = n_.w_[ii]
      const apl_w = apl.wards[ii]

      ward.lastName.value =
        ward.lastName && apl_w.wlastName ? apl_w.wlastName.toUpperCase() : ''

      ward.firstName.value =
        ward.firstName && apl_w.wfirstName ? apl_w.wfirstName.toUpperCase() : ''

      ward.city_ob.value =
        ward.city_ob && apl_w.wcity_ob ? apl_w.wcity_ob.toUpperCase() : ''

      const [day, month, year] = parseTimestamp(apl_w.wdob!)
      ward.dob_day.value = ward.dob_day && apl_w.wdob ? day : 0
      ward.dob_month.value = ward.dob_month && apl_w.wdob ? month : 0
      ward.dob_year.value = ward.dob_year && apl_w.wdob ? year : 0

      if (!apl_w.wotherName) {
        ward.noOtherName.checked = true
        ward.otherName.disabled = true
        ward.otherName.value = ''
      } else {
        ward.otherName.value = apl_w.wotherName.toUpperCase()
        ward.noOtherName.checked = false
        ward.otherName.disabled = false
      }

      if (apl_w.wgender == 'male'.toUpperCase()) {
        ward.genderM.checked = true
        ward.genderF.checked = false
      } else {
        ward.genderM.checked = false
        ward.genderF.checked = true
      }

      setCountry_ob(n_.wcountryOptions, ward.country_ob, apl_w.wcountry_ob)
    }
  }
}

function parseTimestamp(timestamp: Date): [number, number, number] {
  const date = new Date(timestamp)
  const day = date.getDate()
  const month = date.getMonth() + 1 // Months are zero-indexed, so add 1
  const year = date.getFullYear()

  return [day, month, year]
}

const regions_cities = [
  ['AHAFO REGION', 'GOASO'],
  ['ASHANTI REGION', 'KUMASI'],
  ['BONO EAST REGION', 'TECHIMAN'],
  ['BRONG AHAFO REGION', 'SUNYANI'],
  ['CENTRAL REGION', 'CAPE COAST'],
  ['EASTERN REGION', 'KOFORIDUA'],
  ['GREATER ACCRA REGION', 'ACCRA'],
  ['NORTH EAST REGION', 'NALERIGU'],
  ['NORTHERN REGION', 'TAMALE'],
  ['OTI REGION', 'DAMBAI'],
  ['SAVANNAH REGION', 'DAMONGO'],
  ['UPPER EAST REGION', 'BOLGATANGA'],
  ['UPPER WEST REGION', 'WA'],
  ['WESTERN REGION', 'SEKONDI-  TAKORADI'],
  ['WESTERN NORTH REGION', 'SEFWI WIASO'],
  ['VOLTA REGION', 'HO'],
]

function randAddr() {
  const begin = 'P.O.BOX '
  const alphabets = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  // generates random 2 letters
  function rr() {
    return (
      alphabets[Math.floor(Math.random() * alphabets.length)] +
      alphabets[Math.floor(Math.random() * alphabets.length)]
    )
  }
  const addr_letters = rr() + ' '
  const rand_nums = Math.floor(Math.random() * 10000)

  // randomises the chance of letters in the address
  function if_rand_letters() {
    const range = Math.floor(1 + Math.random() * 10)
    if (range >= 5) {
      return addr_letters
    } else {
      return ''
    }
  }
  return {
    address: begin + if_rand_letters() + rand_nums,
    reg_cities:
      regions_cities[Math.floor(Math.random() * regions_cities.length)],
  }
}
