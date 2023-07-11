import {
  PathFactoryFunction,
  pathFactoryProvider,
} from '../pco-api-client/types.js';
import { ApplicationConfig } from './application.js';

const paths = new Map<string, PathFactoryFunction>([
  // Root
  ['root', pathFactoryProvider('get', '')],

  // Batches
  ['readBatches', pathFactoryProvider('get', 'batches')],
  ['createBatch', pathFactoryProvider('post', 'batches')],
  ['updateBatch', pathFactoryProvider('patch', 'batches/{{ id }}')],
  ['deleteBatch', pathFactoryProvider('delete', 'batches/{{ id }}')],
  ['commitBatch', pathFactoryProvider('post', 'batches/{{ id }}/commit')],

  // Batch Groups
  ['readBatchGroups', pathFactoryProvider('get', 'batch_groups')],
  ['createBatchGroup', pathFactoryProvider('post', 'batches_groups')],
  ['updateBatchGroup', pathFactoryProvider('patch', 'batch_groups/{{ id }}')],
  ['deleteBatchGroup', pathFactoryProvider('delete', 'batch_groups/{{ id }}')],
  [
    'commitBatchGroup',
    pathFactoryProvider('post', 'batch_groups/{{ id }}/commit'),
  ],

  // Donations
  ['readDonations', pathFactoryProvider('get', 'donations')],
  [
    'createDonation',
    pathFactoryProvider('post', 'batches/{{ batch }}/donations'),
  ],
  ['updateDonation', pathFactoryProvider('patch', 'donations/{{ id }}')],
  ['deleteDonation', pathFactoryProvider('delete', 'donations/{{ id }}')],
  [
    'refundDonation',
    pathFactoryProvider('post', 'donations/{{ id }}/issue_refund'),
  ],
]);

export const GivingConfigDefault: ApplicationConfig = {
  apiVersion: 'v2',
  appVersion: '2019-10-18',
  name: 'giving',
  paths,
};
