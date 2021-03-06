import { BeenionPrivilege, BeenionPermission } from './types'

export type BeenionPrivilegeConditions = {
  [Privilege in BeenionPrivilege]: BeenionPermission
}

const beenionPrivilegeConditions: BeenionPrivilegeConditions = {
  canCreateJournal: {
    beenionRank: { min: 10 }
  },
  canDeleteJournal: {
    beenionRank: { min: 5000 }
  },
  canRateUserWithGold: {
    beenionRank: { min: 1000 }
  },
  canRateUserWithSilver: {
    beenionRank: { min: 500 }
  },
  canRateUserWithBronze: {
    beenionRank: { min: 100 }
  }
}

export default beenionPrivilegeConditions
