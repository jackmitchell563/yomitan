/*
 * Copyright (C) 2023  Yomitan Authors
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

import type * as Api from './api';
import type * as Core from './core';

export type MessageHandlerDetails = {
    async: boolean;
    contentScript: boolean;
    handler: (params: Core.SerializableObject | undefined, sender: chrome.runtime.MessageSender) => unknown;
};
export type MessageHandlerMap = Map<string, MessageHandlerDetails>;
export type MessageHandlerMapInit = [key: string, handlerDetails: MessageHandlerDetails][];

export type MessageHandlerWithProgressDetails = {
    async: boolean;
    contentScript: boolean;
    handler: (params: Core.SerializableObject | undefined, sender: chrome.runtime.MessageSender, onProgress: (...data: unknown[]) => void) => (Promise<unknown> | unknown);
};
export type MessageHandlerWithProgressMap = Map<string, MessageHandlerWithProgressDetails>;
export type MessageHandlerWithProgressMapInit = [key: string, handlerDetails: MessageHandlerWithProgressDetails][];

export type DatabaseUpdateType = 'dictionary';
export type DatabaseUpdateCause = 'purge' | 'delete' | 'import';

export type MecabParseResults = [
    dictionary: string,
    content: Api.ParseTextLine[],
][];

export type TabInfo = {
    tab: chrome.tabs.Tab;
    url: string | null;
};

export type SettingModification = SettingModificationSet | SettingModificationDelete | SettingModificationSwap | SettingModificationSplice | SettingModificationPush;

export type SettingModificationSet = {
    action: 'set';
    path: string;
    value: unknown;
};

export type SettingModificationDelete = {
    action: 'delete';
    path: string;
};

export type SettingModificationSwap = {
    action: 'swap';
    path1: string;
    path2: string;
};

export type SettingModificationSplice = {
    action: 'splice';
    path: string;
    start: number;
    deleteCount: number;
    items: unknown[];
};

export type SettingModificationPush = {
    action: 'push';
    path: string;
    items: unknown[];
};

export type FindTabsPredicate = (tabInfo: TabInfo) => boolean | Promise<boolean>;

export type InvokeWithProgressRequestMessage = (
    InvokeWithProgressRequestFragmentMessage |
    InvokeWithProgressRequestInvokeMessage
);

export type InvokeWithProgressRequestFragmentMessage = {
    action: 'fragment';
    data: string;
};

export type InvokeWithProgressRequestInvokeMessage = {
    action: 'invoke';
};

export type InvokeWithProgressResponseMessage<TReturn = unknown> = (
    InvokeWithProgressResponseProgressMessage |
    InvokeWithProgressResponseCompleteMessage<TReturn> |
    InvokeWithProgressResponseErrorMessage |
    InvokeWithProgressResponseAcknowledgeMessage
);

export type InvokeWithProgressResponseProgressMessage = {
    type: 'progress';
    data: unknown[];
};

export type InvokeWithProgressResponseCompleteMessage<TReturn = unknown> = {
    type: 'complete';
    data: TReturn;
};

export type InvokeWithProgressResponseErrorMessage = {
    type: 'error';
    data: Core.SerializedError;
};

export type InvokeWithProgressResponseAcknowledgeMessage = {
    type: 'ack';
};
