/*
 * Copyright (c) 2010, 2024 BSI Business Systems Integration AG
 *
 * This program and the accompanying materials are made
 * available under the terms of the Eclipse Public License 2.0
 * which is available at https://www.eclipse.org/legal/epl-2.0/
 *
 * SPDX-License-Identifier: EPL-2.0
 */
import {FormModel, GroupBox, NumberField, SmartField, StringField, TabBox, TabItem} from '@eclipse-scout/core';
import {
  GridDataBox, GridDataBoxWidgetMap, GroupBoxAddFieldBox, GroupBoxAddFieldBoxWidgetMap, GroupBoxDeleteFieldBox, GroupBoxDeleteFieldBoxWidgetMap, LogicalGridLayoutConfigBox, LogicalGridLayoutConfigBoxWidgetMap, LogicalGridLookupCall
} from '../index';

export default (): FormModel => ({
  id: 'jswidgets.LogicalGridForm',
  displayHint: 'view',
  rootGroupBox: {
    id: 'MainBox',
    objectType: GroupBox,
    fields: [
      {
        id: 'DetailBox',
        objectType: GroupBox,
        label: 'Group Box',
        fields: [
          {
            id: 'StringField1',
            objectType: StringField,
            label: 'String Field 1'
          },
          {
            id: 'StringField2',
            objectType: StringField,
            label: 'String Field 2'
          },
          {
            id: 'StringField3',
            objectType: StringField,
            label: 'String Field 3'
          },
          {
            id: 'StringField4',
            objectType: StringField,
            label: 'String Field 4'
          }
        ]
      },
      {
        id: 'ConfigurationBox',
        objectType: TabBox,
        cssClass: 'jswidgets-configuration',
        selectedTab: 'PropertiesTab',
        tabItems: [
          {
            id: 'PropertiesTab',
            objectType: TabItem,
            label: 'Properties',
            fields: [
              {
                id: 'PropertiesBox',
                objectType: GroupBox,
                labelVisible: false,
                borderVisible: false,
                fields: [
                  {
                    id: 'TargetField',
                    objectType: SmartField,
                    label: '${textKey:Target}'
                  },
                  {
                    id: 'LogicalGridField',
                    objectType: SmartField,
                    label: 'Logical Grid',
                    lookupCall: LogicalGridLookupCall,
                    tooltipText: '${textKey:LogicalGridTooltip}'
                  }, {
                    id: 'GridColumnCountField',
                    objectType: NumberField,
                    label: 'Grid Column Count'
                  }
                ]
              },
              {
                id: 'BodyLayoutConfigBox',
                objectType: LogicalGridLayoutConfigBox
              },
              {
                id: 'GridDataBox',
                objectType: GridDataBox,
                label: 'Grid Data Hints'
              },
              {
                id: 'CalculatedGridDataBox',
                objectType: GridDataBox,
                label: 'Calculated Grid Data',
                useHints: false,
                expandable: true,
                expanded: false
              }
            ]
          },
          {
            id: 'ActionsTab',
            objectType: TabItem,
            label: 'Actions',
            fields: [
              {
                id: 'Actions.AddFieldBox',
                objectType: GroupBoxAddFieldBox
              },
              {
                id: 'Actions.DeleteFieldBox',
                objectType: GroupBoxDeleteFieldBox
              }
            ]
          }
        ]
      }
    ]
  }
});

/* **************************************************************************
* GENERATED WIDGET MAPS
* **************************************************************************/

export type LogicalGridFormWidgetMap = {
  'MainBox': GroupBox;
  'DetailBox': GroupBox;
  'StringField1': StringField;
  'StringField2': StringField;
  'StringField3': StringField;
  'StringField4': StringField;
  'ConfigurationBox': TabBox;
  'PropertiesTab': TabItem;
  'PropertiesBox': GroupBox;
  'TargetField': SmartField<any>;
  'LogicalGridField': SmartField<any>;
  'GridColumnCountField': NumberField;
  'BodyLayoutConfigBox': LogicalGridLayoutConfigBox;
  'GridDataBox': GridDataBox;
  'CalculatedGridDataBox': GridDataBox;
  'ActionsTab': TabItem;
  'Actions.AddFieldBox': GroupBoxAddFieldBox;
  'Actions.DeleteFieldBox': GroupBoxDeleteFieldBox;
} & LogicalGridLayoutConfigBoxWidgetMap & GridDataBoxWidgetMap & GroupBoxAddFieldBoxWidgetMap & GroupBoxDeleteFieldBoxWidgetMap;
