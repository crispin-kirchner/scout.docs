/*
 * Copyright (c) 2010, 2024 BSI Business Systems Integration AG
 *
 * This program and the accompanying materials are made
 * available under the terms of the Eclipse Public License 2.0
 * which is available at https://www.eclipse.org/legal/epl-2.0/
 *
 * SPDX-License-Identifier: EPL-2.0
 */
import {Event, EventHandler, Form, FormField, FormModel, InitModelOf, models, PropertyChangeEvent, scout} from '@eclipse-scout/core';
import LogicalGridFormModel from './LogicalGridFormModel';
import {FormFieldLookupCall, LogicalGridFormWidgetMap} from '../index';

export class LogicalGridForm extends Form {
  declare widgetMap: LogicalGridFormWidgetMap;

  protected _fieldFocusHandler: (event: JQuery.FocusEvent) => void;
  protected _fieldRenderHandler: EventHandler<Event<FormField>>;

  constructor() {
    super();
    this._fieldFocusHandler = this._onFieldFocus.bind(this);
    this._fieldRenderHandler = this._onFieldRender.bind(this);
  }

  protected override _jsonModel(): FormModel {
    return models.get(LogicalGridFormModel);
  }

  protected override _init(model: InitModelOf<this>) {
    super._init(model);

    let groupBox = this.widget('DetailBox');
    groupBox.on('propertyChange:fields', event => this._initFields(event.source.fields));
    this._initFields(groupBox.fields);

    let targetField = this.widget('TargetField');
    targetField.lookupCall = new FormFieldLookupCall(groupBox);
    targetField.on('propertyChange:value', this._onTargetFieldValueChange.bind(this));

    let logicalGridField = this.widget('LogicalGridField');
    logicalGridField.setValue(groupBox.logicalGrid);
    logicalGridField.on('propertyChange:value', event => this.widget('DetailBox').setLogicalGrid(event.newValue));

    let gridColumnCountField = this.widget('GridColumnCountField');
    gridColumnCountField.setValue(groupBox.gridColumnCount);
    gridColumnCountField.on('propertyChange:value', event => this.widget('DetailBox').setGridColumnCount(event.newValue));

    let bodyLayoutConfigBox = this.widget('BodyLayoutConfigBox');
    bodyLayoutConfigBox.getLayoutConfig = () => groupBox.bodyLayoutConfig;
    bodyLayoutConfigBox.setLayoutConfig = layoutConfig => {
      groupBox.setBodyLayoutConfig(layoutConfig);
    };
    bodyLayoutConfigBox.setField(groupBox);

    this.widget('GridDataBox').setEnabled(!!targetField.value);

    this.widget('Actions.AddFieldBox').setField(groupBox);
    this.widget('Actions.DeleteFieldBox').setField(groupBox);
  }

  protected _initFields(fields: FormField[]) {
    fields.forEach(field => {
      field.off('render', this._fieldRenderHandler);
      field.on('render', this._fieldRenderHandler);
    });
  }

  protected _onFieldRender(event: Event<FormField>) {
    event.source.$field.off('focus', this._fieldFocusHandler);
    event.source.$field.on('focus', this._fieldFocusHandler);
  }

  protected _onTargetFieldValueChange(event: PropertyChangeEvent<FormField>) {
    let oldField = event.oldValue;
    let newField = event.newValue;
    this.widget('GridDataBox').setField(newField);
    this.widget('GridDataBox').setEnabled(!!newField);
    this.widget('CalculatedGridDataBox').setField(newField);
    if (oldField) {
      oldField.removeCssClass('field-highlighted');
    }
    if (newField) {
      newField.addCssClass('field-highlighted');
    }
  }

  protected _onFieldFocus(event: JQuery.FocusEvent) {
    let field: FormField = scout.widget(event.currentTarget);
    this.widget('TargetField').setValue(field);
    this.widget('Actions.AddFieldBox').setTargetField(field);
    this.widget('Actions.DeleteFieldBox').setTargetField(field);
  }
}
