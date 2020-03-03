/*
 * Copyright 2015-2020 The OpenZipkin Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the License
 * is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express
 * or implied. See the License for the specific language governing permissions and limitations under
 * the License.
 */
import { setupI18n } from '@lingui/core';
import { I18nProvider } from '@lingui/react';
import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import { createMemoryHistory } from 'history';
import { ThemeProvider } from '@material-ui/styles';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import { render } from '@testing-library/react';

import { UiConfigContext } from '../../components/UiConfig';

import enMessages from '../../translations/en/messages';
import { theme } from '../../colors';
import configureStore from '../../store/configure-store';

const i18n = setupI18n();
i18n.load('en', enMessages);
i18n.activate('en');

export default (ui, {
  route = '/',
  history = createMemoryHistory({ initialEntries: [route] }),
  locale = 'en',
  uiConfig = {},
} = {}) => {
  const store = configureStore({});

  const wrapper = ({ children }) => ( // eslint-disable-line react/prop-types
    <Provider store={store}>
      <I18nProvider i18n={i18n}>
        <Router history={history}>
          <MuiPickersUtilsProvider utils={MomentUtils}>
            <ThemeProvider theme={theme}>
              <UiConfigContext.Provider value={uiConfig}>
                {children}
              </UiConfigContext.Provider>
            </ThemeProvider>
          </MuiPickersUtilsProvider>
        </Router>
      </I18nProvider>
    </Provider>
  );
  return {
    ...render(ui, { wrapper }),
    history,
    store,
  };
};
