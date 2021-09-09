export const en = {
  branding: {
    slogan: 'Human-centric identity',
  },
  camera: {
    noPermission: 'No permission to access camera',
  },
  feature: {
    onboarding: {
      biometrics: {
        title: 'Enable Biometric Unlock',
        text: 'Enabling biometrics allows us to securely unlock your mobile wallet. If you decline, we will automatically fall back to unlocking your wallet with a passcode.',
      },
      notifications: {
        title: 'Enable Notifications',
        text: 'Turn on notifications so we can notify you when you receive a credential.',
      },
      finished: {
        title: "You're all set up",
        text: 'Done',
      },
      welcome: {
        title: "Let's Get Started",
        text: "Let's begin",
      },
      action: {
        setPermissions: 'Allow notifications',
        turnOrnBiometrics: 'Turn on biometrics',
        start: 'Start',
      },
    },
    actions: {
      title: {
        actions: 'Notifications',
        showProof: 'Show Proof',
        credentialOffer: 'Credential Offer',
        selectProof: 'Select Proof',
        editProof: 'Edit Proof',
        cantCompleteRequest: 'Unable to complete request',
      },
      text: {
        continueSetup: 'Click here to continue the setup',
        noAvailableAttributes:
          'The proof request attributes you do not currently have. You can delete the request, or make sure to get the required credentials.',
        credentialOfferMessage:
          '<bold>{{connectionName}}</bold> has offered <bold>{{credentialName}}</bold> to you on <bold>{{issueDate}}</bold>. By accepting the credential offer, the credential will be safely stored in your wallet for later use.',
        proofRequestMessage:
          '<bold>{{connectionName}}</bold> has requested <bold>{{proofName}}</bold> from you on <bold>{{requestDate}}</bold>. Accepting this request wil securely share the proof.',
      },
      action: {
        deleteRequest: 'Delete request',
      },
    },
    credentials: {
      title: {
        credentials: 'Credentials',
        details: 'Details',
        finishSetup: 'Finish your setup',
      },
      text: {
        deleteCredential: 'Are you sure you would like to delete this credential?',
        noCredentialsTitle: `It's empty in here`,
        noCredentials: 'You have no credentials, yet.',
        noCredentialsGetEmail: 'You have no credentials, yet. Follow the email setup to receive your first credential.',
        credentialMetadata:
          '<bold>{{connectionName}}</bold> has issued <bold>{{credentialName}}</bold> to you on <bold>{{issueDate}}</bold>.',
      },
    },
    proofs: {
      title: {
        proofs: 'Timeline',
      },
      text: {
        noProofs: 'You have nothing on your timeline, yet.',
        deleteProof: 'Are you sure you would like to delete this proof?',
        proofMetadata:
          'You shared <bold>{{proofName}}</bold> with <bold>{{connectionName}}</bold> on <bold>{{requestDate}}</bold>.',
      },
    },
    contacts: {
      title: {
        contacts: 'Contacts',
        addContact: 'Add Contact',
        editContact: 'Edit Contact',
      },
      action: {
        addContact: 'Save contact',
        deleteContact: 'Delete contact',
      },
      input: {
        contactName: {
          header: 'Contact name',
          help: 'Provide a recognizable name for the contact or use the default',
        },
      },
      text: {
        newConnection:
          '{{name}} would like to connect with you. You can set a name for this connection or leave it blank.',
        deleteConnection: 'Are you sure you would like to delete your connection with {{name}}?',
        noConnection: 'You have no connections. Use the scanner in the top right to add a connection!',
        addedOn: 'Added on {{date}}',
      },
    },
    barcodeScanner: {
      title: 'Scan a QR code',
    },
  },
  action: {
    cancel: 'Cancel',
    delete: 'Delete',
    back: 'Go Back',
    decline: 'Decline',
    accept: 'Accept',
    select: 'Select',
    selected: 'Selected',
    continue: 'Continue',
    next: 'Next',
    openSettings: 'Open Settings',
  },
  input: {
    optional: '(optional)',
  },
  months: {
    0: 'January',
    1: 'Febuary',
    2: 'March',
    3: 'April',
    4: 'May',
    5: 'June',
    6: 'July',
    7: 'August',
    8: 'September',
    9: 'October',
    10: 'November',
    11: 'December',
  },
}
